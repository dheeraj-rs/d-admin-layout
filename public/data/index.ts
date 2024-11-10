// Menu item interfaces
interface MenuItem {
  label: string;
  icon: string;
  items?: MenuItem[];
  to?: string;
  badge?: string;
  url?: string;
  className?: string;
  preventExact?: boolean;
  target?: string;
}

// Settings item interfaces
interface BaseSettingsItem {
  id: string;
  type: string;
  label?: string;
  icon?: string;
  sortOrder: number;
}

interface LinkSettingsItem extends BaseSettingsItem {
  type: "link";
  linkedFolderId: string;
}

interface ComponentSettingsItem extends BaseSettingsItem {
  type: "component";
  componentKey: string;
}

type SettingsItem = LinkSettingsItem | ComponentSettingsItem;

interface SettingsFolder {
  id: string;
  key: string;
  items: SettingsItem[];
}

interface LayoutTheme {
  theme: string;
  label: string;
  scheme: "light" | "dark";
}

// Menu items export
export const menuitem: MenuItem[] = [
  {
    label: "Home",
    icon: "pi pi-home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-home",
        to: "/", // Kept as is since it matches
      },
    ],
  },
  {
    label: "sites",
    icon: "pi pi-globe",
    items: [
      {
        label: "Ecommerce",
        icon: "pi pi-eye",
        to: "/blocks", // Updated based on "Free Blocks" path
        badge: "NEW",
      },
      {
        label: "Basic",
        icon: "pi pi-globe",
        to: "/blocks", // Updated based on similar structure
      },
    ],
  },
  {
    label: "pages",
    icon: "pi pi-briefcase",
    items: [
      {
        label: "UI elements",
        icon: "pi pi-briefcase",
        items: [
          {
            label: "Form Layout",
            icon: "pi pi-id-card",
            to: "/uikit/formlayout",
          },
          {
            label: "Input",
            icon: "pi pi-check-square",
            to: "/uikit/input",
          },
          {
            label: "Float Label",
            icon: "pi pi-bookmark",
            to: "/uikit/floatlabel",
          },
          {
            label: "Invalid State",
            icon: "pi pi-exclamation-circle",
            to: "/uikit/invalidstate",
          },
          {
            label: "Button",
            icon: "pi pi-mobile",
            to: "/uikit/button",
            className: "rotated-icon",
          },
          { label: "Table", icon: "pi pi-table", to: "/uikit/table" },
          { label: "Tree", icon: "pi pi-share-alt", to: "/uikit/tree" },
          { label: "Panel", icon: "pi pi-tablet", to: "/uikit/panel" },
          { label: "Overlay", icon: "pi pi-clone", to: "/uikit/overlay" },
          { label: "Media", icon: "pi pi-image", to: "/uikit/media" },
          {
            label: "Menu",
            icon: "pi pi-bars",
            to: "/uikit/menu",
            preventExact: true,
          },
          {
            label: "Message",
            icon: "pi pi-comment",
            to: "/uikit/message",
          },
          { label: "File", icon: "pi pi-file", to: "/uikit/file" },
          {
            label: "Chart",
            icon: "pi pi-chart-bar",
            to: "/uikit/charts",
          },
          {
            label: "Misc",
            icon: "pi pi-circle",
            to: "/uikit/misc",
          },
        ],
      },
      {
        label: "Sections",
        icon: "pi pi-briefcase",
        items: [
          {
            label: "Form Layout",
            icon: "pi pi-id-card",
            to: "/uikit/formlayout",
          },
          {
            label: "Input2",
            icon: "pi pi-check-square",
            to: "/uikit/input",
          },
          {
            label: "Float Label",
            icon: "pi pi-bookmark",
            to: "/uikit/floatlabel",
          },
        ],
      },
      {
        label: "Pages",
        icon: "pi pi-briefcase",
        items: [
          {
            label: "Landing2",
            icon: "pi pi-globe",
            to: "/landing",
          },
          {
            label: "Auth",
            icon: "pi pi-user",
            items: [
              {
                label: "Login",
                icon: "pi pi-sign-in",
                to: "/auth/login",
              },
              {
                label: "Error",
                icon: "pi pi-times-circle",
                to: "/auth/error",
              },
              {
                label: "Access Denied",
                icon: "pi pi-lock",
                to: "/auth/access",
              },
            ],
          },
          {
            label: "Crud",
            icon: "pi pi-pencil",
            to: "/pages/crud",
          },
          {
            label: "Timeline",
            icon: "pi pi-calendar",
            to: "/pages/timeline",
          },
          {
            label: "Not Found",
            icon: "pi pi-exclamation-circle",
            to: "/pages/notfound",
          },
          {
            label: "Empty",
            icon: "pi pi-circle-off",
            to: "/pages/empty",
          },
        ],
      },
    ],
  },
  {
    label: "Utils",
    icon: "pi pi-desktop",
    items: [
      {
        label: "drjicons",
        icon: "pi pi-desktop",
        url: "https://www.npmjs.com/package/drjicons",
      },
      {
        label: "drjFlex",
        icon: "pi pi-desktop",
        url: "https://www.npmjs.com/package/drjflex",
      },
    ],
  },
];

export const SettingsItems: SettingsFolder[] = [
  {
    id: "folder-main",
    key: "main",
    items: [
      {
        id: "main-settings",
        type: "link",
        label: "Settings",
        icon: "cog",
        linkedFolderId: "settings",
        sortOrder: 1,
      },
      {
        id: "main-customize",
        type: "link",
        label: "Customize",
        icon: "palette",
        linkedFolderId: "customize",
        sortOrder: 2,
      },
    ],
  },
  {
    id: "folder-customize",
    key: "customize",
    items: [
      {
        id: "customize-back",
        type: "link",
        label: "Back",
        icon: "arrow-left",
        linkedFolderId: "main",
        sortOrder: 1,
      },
      {
        id: "customize-content",
        type: "component",
        componentKey: "CustomizeSettings",
        sortOrder: 2,
      },
    ],
  },
  {
    id: "folder-settings",
    key: "settings",
    items: [
      {
        id: "settings-back",
        type: "link",
        label: "Back",
        icon: "arrow-left",
        linkedFolderId: "main",
        sortOrder: 1,
      },
      {
        id: "settings-content",
        type: "component",
        componentKey: "AppLayoutSettings",
        sortOrder: 2,
      },
    ],
  },
];

export const layoutScales: number[] = [10, 11, 12, 13, 14];

export const layoutThemes: LayoutTheme[] = [
  { theme: "lara-light-indigo", label: "Light Indigo", scheme: "light" },
  { theme: "lara-dark-indigo", label: "Dark Indigo", scheme: "dark" },
  { theme: "lara-light-teal", label: "Light Teal", scheme: "light" },
  { theme: "lara-dark-teal", label: "Dark Teal", scheme: "dark" },
];
