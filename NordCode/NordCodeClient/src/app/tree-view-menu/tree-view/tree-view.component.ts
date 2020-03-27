import { Component, OnInit } from '@angular/core';
import { ProjectRoleService } from 'src/app/services/project-role.service';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  public roleName: string;
  menuList: any;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private _projectService: ProjectRoleService, protected alertService: AlertService) { }
  ngOnInit() {
    this.roleName = "Admin";
    this._projectService.getMenuDetails(this.roleName).subscribe((res: any) => {
      debugger;
      this.menuList = [  
        {  
            title: 'Parent 1',  
            routerLink: '/ap/dashboard',  
            style: 'fa fa-home',  
            nodeId: 'liDashboard',  
            param: '',  
            categories: []  
        },  
        {  
            title: 'Parent 2',  
            routerLink: '',  
            style: 'fa fa-users',  
            nodeId: 'liAssociates',  
            param: '',  
            categories: [  
                {  
                    title: 'Child 1',  
                    style: 'fa fa-users',  
                    nodeId: 'liProspectiveAssociate',  
                    param: '',  
                    routerLink: '/ap/associates/view',  
                    categories: [  
                                    {  
                                        title: 'Grand Child 1',  
                                        style: 'fa fa-users',  
                                        nodeId: 'A',  
                                        param: '',  
                                        routerLink: '/ap/associates/view',  
                                        categories: [  
                                                        {  
                                                            title: 'Grand Grand Child 1',  
                                                            style: 'fa fa-user-plus',  
                                                            nodeId: 'D',  
                                                            param: '',  
                                                            routerLink: '/ap/reports/resourcereport',  
                                                            categories: []  
                                                        },  
                                                        {  
                                                            title: 'Grand Grand Child 2',  
                                                            style: 'fa fa-user-plus',  
                                                            nodeId: 'E',  
                                                            param: '',  
                                                            routerLink: '/ap/reports/financereport',  
                                                            categories: []  
                                                        },  
                                                        {  
                                                            title: 'Grand Grand Child 3',  
                                                            style: 'fa fa-pencil-square',  
                                                            nodeId: 'F',  
                                                            param: '',  
                                                            routerLink: '/ap/reports/importRMGreport',  
                                                            categories: []  
                                                        }  
                                                ]  
                                    },  
                                    {  
                                        title: 'Grand Child 2',  
                                        style: 'fa fa-pencil-square',  
                                        nodeId: 'B',  
                                        param: '',  
                                        routerLink: '/ap/associates/prospective-associates',  
                                        categories: []  
                                    },  
                                    {  
                                        title: 'Grand Child 3',  
                                        style: 'fa fa-users',  
                                        nodeId: 'C',  
                                        param: '',  
                                        routerLink: '/ap/associates/list',  
                                        categories: []  
                                    }  
                            ]  
                },  
                {  
                    title: 'Child 2',  
                    style: 'fa fa-pencil-square',  
                    nodeId: 'liAssociateJoining',  
                    param: '',  
                    routerLink: '/ap/associates/prospective-associates',  
                    categories: []  
                },  
                {  
                    title: 'Child 3',  
                    style: 'fa fa-users',  
                    nodeId: 'liAssociatesChild',  
                    param: '',  
                    routerLink: '/ap/associates/list',  
                    categories: []  
                }  
            ]  
        },  
        {  
            title: 'Parent 3',  
            routerLink: '',  
            style: 'fa fa-users',  
            nodeId: 'liTalentManagement',  
            param: '',  
            categories: []  
        },  
        {  
            title: 'Parent 4',  
            routerLink: '',  
            style: 'fa fa-users',  
            nodeId: 'liTeamManagement',  
            param: '',  
            categories: []  
        },  
        {  
            title: 'Parent 5',  
            routerLink: '',  
            style: 'fa fa-users',  
            nodeId: 'liPerformanceManagement',  
            param: '',  
            categories: []  
        },  
        {  
            title: 'Parent 6',  
            routerLink: '',  
            style: 'fa fa-street-view',  
            nodeId: 'liAdmin',  
            param: '',  
            categories: [ ]  
        },  
        {  
            title: 'Parent 7',  
            routerLink: '',  
            style: 'fa fa-users',  
            nodeId: 'liReports',  
            param: '',  
            categories: []  
        }  
    ] //res.data;
    }, (error) => {
      this.alertService.success('Success!!', this.options);
    });
  }

  
}
