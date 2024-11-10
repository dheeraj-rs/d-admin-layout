"use client";
import React, { useContext } from "react";
import { MenuProvider } from "@/layout/context/menucontext";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { menuitem } from "@/public/data";
import AppMenuitem from "./AppMenuitem";

// Define types for menu items
interface MenuItem {
  label?: string;
  seperator?: boolean;
  icon?: string;
  items?: MenuItem[];
  url?: string;
  // Add other potential properties your menu items might have
}

// Define the layout state type
interface LayoutState {
  searchSidebarItems?: MenuItem[];
  // Add other layout state properties if they exist
}

// Define the layout context type
interface LayoutContextType {
  layoutState: LayoutState;
  // Add other context properties if they exist
}

const AppMenu: React.FC = () => {
  const { layoutState } = useContext(
    LayoutContext as unknown as React.Context<LayoutContextType>
  );

  const items: MenuItem[] = layoutState?.searchSidebarItems?.length
    ? layoutState.searchSidebarItems
    : menuitem;

  return (
    <MenuProvider>
      <div className="layout__sidebar-content">
        <div className="sidebar-menu-container">
          <ul className="sidebar-menu">
            {items?.map((item: MenuItem, index: number) =>
              item.seperator ? (
                <li key={`separator-${index}`} className="menu-separator" />
              ) : (
                <AppMenuitem
                  key={index}
                  item={item as any}
                  root={true}
                  index={index}
                />
              )
            )}
            <div className="menuDummyItem" />
          </ul>
        </div>
      </div>
    </MenuProvider>
  );
};

export default AppMenu;
