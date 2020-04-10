export class NavItem {
    parentId: string;
    displayName: string;
    //disabled?: boolean;
    iconName: string;
    route?: string;
    children: NavItem[];
  }
  