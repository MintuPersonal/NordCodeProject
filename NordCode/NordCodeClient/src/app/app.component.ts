import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
import { NavItem } from './models/nav-item';
import { NavbarService } from './services/navbar.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Ecom_Menu } from './models/Menu';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild('appDrawerRight') appDrawerRight: ElementRef;
  navItems: NavItem[];
  //= [
  //   {
  //     displayName: 'DevFestFL',
  //     iconName: 'recent_actors',
  //     route: 'devfestfl',
  //     children: [
  //       {
  //         displayName: 'Speakers',
  //         iconName: 'group',
  //         route: 'devfestfl/speakers',
  //         children: [
  //           {
  //             displayName: 'Michael Prentice',
  //             iconName: 'person',
  //             route: 'devfestfl/speakers/michael-prentice',
  //             children: [
  //               {
  //                 displayName: 'Create Enterprise UIs',
  //                 iconName: 'star_rate',
  //                 route: 'devfestfl/speakers/michael-prentice/material-design'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Stephen Fluin',
  //             iconName: 'person',
  //             route: 'devfestfl/speakers/stephen-fluin',
  //             children: [
  //               {
  //                 displayName: 'What\'s up with the Web?',
  //                 iconName: 'star_rate',
  //                 route: 'devfestfl/speakers/stephen-fluin/what-up-web'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Mike Brocchi',
  //             iconName: 'person',
  //             route: 'devfestfl/speakers/mike-brocchi',
  //             children: [
  //               {
  //                 displayName: 'My ally, the CLI',
  //                 iconName: 'star_rate',
  //                 route: 'devfestfl/speakers/mike-brocchi/my-ally-cli'
  //               },
  //               {
  //                 displayName: 'Become an Angular Tailor',
  //                 iconName: 'star_rate',
  //                 route: 'devfestfl/speakers/mike-brocchi/become-angular-tailer'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Sessions',
  //         iconName: 'speaker_notes',
  //         route: 'devfestfl/sessions',
  //         children: [
  //           {
  //             displayName: 'Create Enterprise UIs',
  //             iconName: 'star_rate',
  //             route: 'devfestfl/sessions/material-design'
  //           },
  //           {
  //             displayName: 'What\'s up with the Web?',
  //             iconName: 'star_rate',
  //             route: 'devfestfl/sessions/what-up-web'
  //           },
  //           {
  //             displayName: 'My ally, the CLI',
  //             iconName: 'star_rate',
  //             route: 'devfestfl/sessions/my-ally-cli'
  //           },
  //           {
  //             displayName: 'Become an Angular Tailor',
  //             iconName: 'star_rate',
  //             route: 'devfestfl/sessions/become-angular-tailer'
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Feedback',
  //         iconName: 'feedback',
  //         route: 'devfestfl/feedback'
  //       }
  //     ]
  //   },
  //   {
  //     displayName: 'Disney',
  //     iconName: 'videocam',
  //     children: [
  //       {
  //         displayName: 'Speakers',
  //         iconName: 'group',
  //         children: [
  //           {
  //             displayName: 'Michael Prentice',
  //             iconName: 'person',
  //             route: 'michael-prentice',
  //             children: [
  //               {
  //                 displayName: 'Create Enterprise UIs',
  //                 iconName: 'star_rate',
  //                 route: 'material-design'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Stephen Fluin',
  //             iconName: 'person',
  //             route: 'stephen-fluin',
  //             children: [
  //               {
  //                 displayName: 'What\'s up with the Web?',
  //                 iconName: 'star_rate',
  //                 route: 'what-up-web'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Mike Brocchi',
  //             iconName: 'person',
  //             route: 'mike-brocchi',
  //             children: [
  //               {
  //                 displayName: 'My ally, the CLI',
  //                 iconName: 'star_rate',
  //                 route: 'my-ally-cli'
  //               },
  //               {
  //                 displayName: 'Become an Angular Tailor',
  //                 iconName: 'star_rate',
  //                 route: 'become-angular-tailer'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Sessions',
  //         iconName: 'speaker_notes',
  //         children: [
  //           {
  //             displayName: 'Create Enterprise UIs',
  //             iconName: 'star_rate',
  //             route: 'material-design'
  //           },
  //           {
  //             displayName: 'What\'s up with the Web?',
  //             iconName: 'star_rate',
  //             route: 'what-up-web'
  //           },
  //           {
  //             displayName: 'My ally, the CLI',
  //             iconName: 'star_rate',
  //             route: 'my-ally-cli'
  //           },
  //           {
  //             displayName: 'Become an Angular Tailor',
  //             iconName: 'star_rate',
  //             route: 'become-angular-tailer'
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Feedback',
  //         iconName: 'feedback',
  //         route: 'feedback'
  //       }
  //     ]
  //   },
  //   {
  //     displayName: 'Orlando',
  //     iconName: 'movie_filter',
  //     children: [
  //       {
  //         displayName: 'Speakers',
  //         iconName: 'group',
  //         children: [
  //           {
  //             displayName: 'Michael Prentice',
  //             iconName: 'person',
  //             route: 'michael-prentice',
  //             children: [
  //               {
  //                 displayName: 'Create Enterprise UIs',
  //                 iconName: 'star_rate',
  //                 route: 'material-design'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Stephen Fluin',
  //             iconName: 'person',
  //             route: 'stephen-fluin',
  //             children: [
  //               {
  //                 displayName: 'What\'s up with the Web?',
  //                 iconName: 'star_rate',
  //                 route: 'what-up-web'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Mike Brocchi',
  //             iconName: 'person',
  //             route: 'mike-brocchi',
  //             children: [
  //               {
  //                 displayName: 'My ally, the CLI',
  //                 iconName: 'star_rate',
  //                 route: 'my-ally-cli'
  //               },
  //               {
  //                 displayName: 'Become an Angular Tailor',
  //                 iconName: 'star_rate',
  //                 route: 'become-angular-tailer'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Sessions',
  //         iconName: 'speaker_notes',
  //         children: [
  //           {
  //             displayName: 'Create Enterprise UIs',
  //             iconName: 'star_rate',
  //             route: 'material-design'
  //           },
  //           {
  //             displayName: 'What\'s up with the Web?',
  //             iconName: 'star_rate',
  //             route: 'what-up-web'
  //           },
  //           {
  //             displayName: 'My ally, the CLI',
  //             iconName: 'star_rate',
  //             route: 'my-ally-cli'
  //           },
  //           {
  //             displayName: 'Become an Angular Tailor',
  //             iconName: 'star_rate',
  //             route: 'become-angular-tailer'
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Feedback',
  //         iconName: 'feedback',
  //         route: 'feedback'
  //       }
  //     ]
  //   },
  //   {
  //     displayName: 'Maleficent',
  //     disabled: true,
  //     iconName: 'report_problem',
  //     children: [
  //       {
  //         displayName: 'Speakers',
  //         iconName: 'group',
  //         children: [
  //           {
  //             displayName: 'Michael Prentice',
  //             iconName: 'person',
  //             route: 'michael-prentice',
  //             children: [
  //               {
  //                 displayName: 'Create Enterprise UIs',
  //                 iconName: 'star_rate',
  //                 route: 'material-design'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Stephen Fluin',
  //             iconName: 'person',
  //             route: 'stephen-fluin',
  //             children: [
  //               {
  //                 displayName: 'What\'s up with the Web?',
  //                 iconName: 'star_rate',
  //                 route: 'what-up-web'
  //               }
  //             ]
  //           },
  //           {
  //             displayName: 'Mike Brocchi',
  //             iconName: 'person',
  //             route: 'mike-brocchi',
  //             children: [
  //               {
  //                 displayName: 'My ally, the CLI',
  //                 iconName: 'star_rate',
  //                 route: 'my-ally-cli'
  //               },
  //               {
  //                 displayName: 'Become an Angular Tailor',
  //                 iconName: 'star_rate',
  //                 route: 'become-angular-tailer'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Sessions',
  //         iconName: 'speaker_notes',
  //         children: [
  //           {
  //             displayName: 'Create Enterprise UIs',
  //             iconName: 'star_rate',
  //             route: 'material-design'
  //           },
  //           {
  //             displayName: 'What\'s up with the Web?',
  //             iconName: 'star_rate',
  //             route: 'what-up-web'
  //           },
  //           {
  //             displayName: 'My ally, the CLI',
  //             iconName: 'star_rate',
  //             route: 'my-ally-cli'
  //           },
  //           {
  //             displayName: 'Become an Angular Tailor',
  //             iconName: 'star_rate',
  //             route: 'become-angular-tailer'
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Feedback',
  //         iconName: 'feedback',
  //         route: 'feedback'
  //       }
  //     ]
  //   }
  // ];
  menuItems: object;
  mySubscription: any;
  title = 'BardCode';
  menuObj: Object[];
  aMenu: Ecom_Menu;
  newitem: Ecom_Menu[];
  newnav: NavItem;
  constructor(private navService: NavbarService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

    navService.getmenus('admin').subscribe((menus: any) => {
      this.newitem = menus.data as Ecom_Menu[];
      this.RenderMenu(this.newitem);
      //debugger;
      //this.navItems = this.newitem;
    })
    this.logMessage(this.navItems)
  }

  RenderMenu(list: Ecom_Menu[]) {
    this.navItems = [];
    list.forEach(item => {
      item.children = []
      this.newnav = new NavItem();
      this.newnav.parentId = item.ParentId;
      this.newnav.displayName = item.displayName;
      this.newnav.iconName = item.iconName;
      this.newnav.route = item.route;
      this.navItems.push(this.newnav);

    });
    this._setChild(this.navItems);
    // console.log(this.newitem);
  }
  _setChild(navItems: NavItem[]) {
    navItems.forEach(navItem => {
      if (navItem.parentId !== '0') {
        this.navItems[navItem.parentId].children = navItem;
      }
    })

  };
  //function list_to_tree(list) {
  // var map = {}, node, roots = [], i;
  // for (i = 0; i < list.length; i += 1) {
  //   map[list[i].PID] = i; // initialize the map
  //   list[i].children = []; // initialize the children
  // }
  // debugger;
  // node = list[i];
  // for (i = 0; i < list.length; i += 1) {
  //   var items = list[i]
  //   if (items.ParentId !== "0") {
  //     var itemobj = map[items.ParentId];
  //    // var ch = {children: itemobj};
  //     list[itemobj].children[{itemobj}] =  ;
  //     //var c = list[id].children.push();
  //     //c.push();
  //   } else {
  //     roots.push(items);
  //   }
  // }
  //return roots;
  //}

  // var entries = [
  //     {
  //         "id": "12",
  //         "parentId": "0",
  //         "text": "Man",
  //         "level": "1"
  //     }, { /*...*/ }
  // ];

  // "id": "12",
  // "parentId": "0",
  // "text": "Man",
  // "level": "1",
  // "children": null

  //console.log(list_to_tree(entries));


  //   navItems.filter(data=>{}).forEach(item => {
  //     this.aMenu = new Ecom_Menu();
  //     this.aMenu.displayName = 'home Apparel';
  //     this.aMenu.iconName = 'recent_actors';
  //     this.aMenu.route = 'product';
  //     this.aMenu.children = []
  //   })

  //return this.aMenu;

  //createTreeView(data, 0,0,-1);
  //function createTreeView(data, currentParent, currLevel = 0, prevLevel = -1) {


  // for ( var i=0; i< data.length; i++) {

  // if (currentParent == data[i].parentid) {     

  //     if (currLevel > prevLevel) 
  //     %>
  //      <ul> <%

  //     if (currLevel == prevLevel) 
  //     %> </li>

  //     <li> <label><%= data[i].PName %><a href="/admin/CategoryEdit/<%= data[i].PID %>"> Edit</a></label>;
  //       <%
  //     if (currLevel > prevLevel) { prevLevel = currLevel; }

  //     currLevel++; 

  //     createTreeView (data, data[i].PID, currLevel, prevLevel);

  //     currLevel--;               
  //     }   

  // }

  // if (currLevel == prevLevel)
  //  %> </li>  </ul> <%   

  //}   


  //}


  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  logMessage(value) {
    //debugger;
    console.log(value);
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.appDrawerRight = this.appDrawerRight;
  }
}
