export class NavItem {
  //     parentId: string;
  //     displayName: string;
  //     //disabled?: boolean;
  //     iconName: string;
  //     route?: string;
  //     //children: NavItem[];
  //   }

  //export interface Question {
  Id: number;
  Text: string;
  Desc: string;
  route: string;
  iconName: string;
  ParentId: number;
  ChildAnswers?: Answer[];
}

export interface Answer {
  Id: number;
  Text: string;
  Desc: string;
  route: string;
  iconName: string;
  ParentId: number;
  ChildQuestion?: NavItem;
}