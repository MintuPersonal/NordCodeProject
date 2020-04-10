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
  menuItems: object[];
  mySubscription: any;

  constructor(private navService: NavbarService,private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {       
         this.router.navigated = false;
      }
    }); 

    navService.getmenus('admin').subscribe((menus: any) => {
      this.navItems = menus.data as NavItem[];
      //console.log(environment.production);
    })
    this.logMessage(this.navItems)
  }
  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  title = 'BardCode';
  logMessage(value) {
    //debugger;
    console.log(value);
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.appDrawerRight = this.appDrawerRight;
  }
}
