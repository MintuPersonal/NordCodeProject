//import { Component, OnInit, ElementRef } from '@angular/core';
import { ProjectRoleService } from 'src/app/services/project-role.service';
import { AlertService } from 'src/app/_alert';
import { Ecom_Menu } from '../../../models/menu';

import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {VERSION} from '@angular/material';
import {NavItem} from '../../../models/nav-item';
import {NavbarService} from '../../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'DevFestFL',
      iconName: 'recent_actors',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'devfestfl/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'devfestfl/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'devfestfl/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'devfestfl/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'devfestfl/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'devfestfl/feedback'
        }
      ]
    },
    {
      displayName: 'Disney',
      iconName: 'videocam',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'Orlando',
      iconName: 'movie_filter',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'Maleficent',
      disabled: true,
      iconName: 'report_problem',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    }
  ];

  constructor(private navService: NavbarService) {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }




  // constructor(protected _projectService: ProjectRoleService, private alertService: AlertService) { }
  // ngOnInit(): void {
    
  // }

  // public roleName: string;
  // public menuList: Ecom_Menu[];
  // public commercialObj: object[];
  // options = {
  //   autoClose: true,
  //   keepAfterRouteChange: false
  // };
  // ngOnInit() {
  //   this.roleName = "Admin";
  //   this._projectService.getMenuDetails(this.roleName).subscribe((data: any) => {

  //     this.menuList = data.data;
  //     debugger;
  //     // this.menuList = [
  //     //   {
  //     //     title: 'Parent 1',
  //     //     routerLink: '/ap/dashboard',
  //     //     style: 'fa fa-home',
  //     //     nodeId: 'liDashboard',
  //     //     param: '',
  //     //     categories: []
  //     //   },
  //     //   {
  //     //     title: 'Parent 2',
  //     //     routerLink: '',
  //     //     style: 'fa fa-users',
  //     //     nodeId: 'liAssociates',
  //     //     param: '',
  //     //     categories: [
  //     //       {
  //     //         title: 'Child 1',
  //     //         style: 'fa fa-users',
  //     //         nodeId: 'liProspectiveAssociate',
  //     //         param: '',
  //     //         routerLink: '/ap/associates/view',
  //     //         categories: [
  //     //           {
  //     //             title: 'Grand Child 1',
  //     //             style: 'fa fa-users',
  //     //             nodeId: 'A',
  //     //             param: '',
  //     //             routerLink: '/ap/associates/view',
  //     //             categories: [
  //     //               {
  //     //                 title: 'Grand Grand Child 1',
  //     //                 style: 'fa fa-user-plus',
  //     //                 nodeId: 'D',
  //     //                 param: '',
  //     //                 routerLink: '/ap/reports/resourcereport',
  //     //                 categories: []
  //     //               },
  //     //               {
  //     //                 title: 'Grand Grand Child 2',
  //     //                 style: 'fa fa-user-plus',
  //     //                 nodeId: 'E',
  //     //                 param: '',
  //     //                 routerLink: '/ap/reports/financereport',
  //     //                 categories: []
  //     //               },
  //     //               {
  //     //                 title: 'Grand Grand Child 3',
  //     //                 style: 'fa fa-pencil-square',
  //     //                 nodeId: 'F',
  //     //                 param: '',
  //     //                 routerLink: '/ap/reports/importRMGreport',
  //     //                 categories: []
  //     //               }
  //     //             ]
  //     //           },
  //     //           {
  //     //             title: 'Grand Child 2',
  //     //             style: 'fa fa-pencil-square',
  //     //             nodeId: 'B',
  //     //             param: '',
  //     //             routerLink: '/ap/associates/prospective-associates',
  //     //             categories: []
  //     //           },
  //     //           {
  //     //             title: 'Grand Child 3',
  //     //             style: 'fa fa-users',
  //     //             nodeId: 'C',
  //     //             param: '',
  //     //             routerLink: '/ap/associates/list',
  //     //             categories: []
  //     //           }
  //     //         ]
  //     //       },
  //     //       {
  //     //         title: 'Child 2',
  //     //         style: 'fa fa-pencil-square',
  //     //         nodeId: 'liAssociateJoining',
  //     //         param: '',
  //     //         routerLink: '/ap/associates/prospective-associates',
  //     //         categories: []
  //     //       },
  //     //       {
  //     //         title: 'Child 3',
  //     //         style: 'fa fa-users',
  //     //         nodeId: 'liAssociatesChild',
  //     //         param: '',
  //     //         routerLink: '/ap/associates/list',
  //     //         categories: []
  //     //       }
  //     //     ]
  //     //   },
  //     //   {
  //     //     title: 'Parent 3',
  //     //     routerLink: '',
  //     //     style: 'fa fa-users',
  //     //     nodeId: 'liTalentManagement',
  //     //     param: '',
  //     //     categories: []
  //     //   },
  //     //   {
  //     //     title: 'Parent 4',
  //     //     routerLink: '',
  //     //     style: 'fa fa-users',
  //     //     nodeId: 'liTeamManagement',
  //     //     param: '',
  //     //     categories: []
  //     //   },
  //     //   {
  //     //     title: 'Parent 5',
  //     //     routerLink: '',
  //     //     style: 'fa fa-users',
  //     //     nodeId: 'liPerformanceManagement',
  //     //     param: '',
  //     //     categories: []
  //     //   },
  //     //   {
  //     //     title: 'Parent 6',
  //     //     routerLink: '',
  //     //     style: 'fa fa-street-view',
  //     //     nodeId: 'liAdmin',
  //     //     param: '',
  //     //     categories: []
  //     //   },
  //     //   {
  //     //     title: 'Parent 7',
  //     //     routerLink: '',
  //     //     style: 'fa fa-users',
  //     //     nodeId: 'liReports',
  //     //     param: '',
  //     //     categories: []
  //     //   }
  //     // ];
  //     console.log('Total Data menu: ' + this.menuList);
  //     this.commercialObj = this.menuList as object[];
  //     console.log('Total Data: ' + this.commercialObj);

  //     //res.data;
  //   }, (error) => {
  //     this.alertService.success('Success!!', this.options);
  //   });
  // }

  openMenuNav() {
    document.getElementById("menunav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
  }

  closeMenuNav() {
    document.getElementById("menunav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
  }

}
