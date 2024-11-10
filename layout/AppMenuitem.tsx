import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "@/layout/context/menucontext";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { classNames } from "@/lib/utils";
import { LayoutContextType, MenuContextType } from "@/types/context";
import { AppSidebarMenuItemProps } from "@/types/sidebarmenuitem";
import Ripple from "./Ripple";
const AppMenuitem: React.FC<AppSidebarMenuItemProps> = ({
  item,
  index,
  parentKey,
  root,
}) => {
  const pathname = usePathname();
  const { activeMenu, setActiveMenu } = useContext(
    MenuContext as React.Context<MenuContextType>
  );
  const { setMouseOverLabel, layoutState } = useContext(
    LayoutContext as React.Context<LayoutContextType>
  );
  const nodeRef = useRef<HTMLUListElement>(null);

  const key = parentKey ? `${parentKey}-${index}` : String(index);
  const isActive = activeMenu === key || activeMenu.startsWith(`${key}-`);
  const showTooltip =
    layoutState?.leftSidebarMode === "mini" || layoutState?.isMobileActive;

  useEffect(() => {
    if (item?.to && item?.to === pathname) setActiveMenu(key);
  }, [pathname, item?.to, key, setActiveMenu]);

  const itemProps: React.HTMLAttributes<HTMLAnchorElement> & {
    "data-tooltip-id"?: string;
    onMouseOver?: () => void;
  } = {
    className: classNames(item?.className, "p-ripple", {
      "active-route": pathname === item?.to,
    }),
    style: { overflow: "hidden", position: "relative" },
    ...(showTooltip && {
      "data-tooltip-id": item?.label,
      onMouseOver: () => setMouseOverLabel(item?.label),
    }),
    onClick: (e: React.MouseEvent) => {
      if (item?.disabled) return e.preventDefault();
      item?.command?.({ originalEvent: e, item });
      setActiveMenu(item?.items ? (isActive ? parentKey || "" : key) : key);
    },
  };

  const menuContent = (
    <>
      <i className={classNames("layout-menuitem-icon", item?.icon)} />
      <span className="layout-menuitem-text">{item?.label}</span>
      {item?.items && (
        <i
          className={`pi ${
            isActive ? "pi-angle-up" : "pi-angle-down"
          } layout-submenu-toggler`}
        />
      )}
      <Ripple />
    </>
  );

  if (item?.visible === false) return null;

  return (
    <li
      className={classNames({
        "layout-root-menuitem": root,
        "active-menuitem": isActive,
      })}
    >
      {root && <div className="layout-menuitem-root-text">{item?.label}</div>}
      {item?.to && !item?.items ? (
        <Link
          href={item.to}
          replace={item.replaceUrl}
          target={item.target}
          {...itemProps}
        >
          {menuContent}
        </Link>
      ) : (
        <a href={item?.url} target={item?.target} {...itemProps}>
          {menuContent}
        </a>
      )}
      {item?.items && (
        <CSSTransition
          nodeRef={nodeRef}
          timeout={{ enter: 1000, exit: 450 }}
          classNames="layout-submenu"
          in={root ? true : isActive}
          key={item?.label}
        >
          <ul ref={nodeRef}>
            {item.items.map((child, i) => (
              <AppMenuitem
                key={child.label}
                item={child}
                index={i}
                className={child.badgeClass}
                parentKey={key}
              />
            ))}
          </ul>
        </CSSTransition>
      )}
    </li>
  );
};

export default AppMenuitem;
