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
  menuItems: object;
  mySubscription: any;
  title = 'BardCode';
  menuObj: Object[];
  aMenu: Ecom_Menu;
  newitem: Ecom_Menu[];
  newnav: NavItem;
  constructor(private navService: NavbarService, private router: Router ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

    navService.getmenus('admin').subscribe((menus: any) => {
      const distinctThings = menus.data.filter(
        (thing, i, arr) => arr.findIndex(t => t.Text === thing.Text) === i
      );

      this.navItems = this.RenderMenu(distinctThings);
    })
    this.logMessage(this.navItems)
  }
  private RenderMenu(data_off: any): NavItem[] {

    // var data_off = [
    //   { Id: 1, route: 'product', iconName: 'person', Text: 'What kind of apple is it?', Desc: '', ParentId: 0 },
    //   { Id: 2, route: 'product', iconName: 'person', Text: 'Green Apple', Desc: '', ParentId: 1 },
    //   { Id: 3, route: 'product', iconName: 'person', Text: 'Red Apple', Desc: '', ParentId: 1 },
    //   { Id: 4, route: 'product', iconName: 'person', Text: 'Purple GMO Apple', Desc: '', ParentId: 1 },
    //   { Id: 5, route: 'product', iconName: 'person', Text: 'What is the issue with the apple?', Desc: '', ParentId: 2 },
    //   { Id: 6, route: 'product', iconName: 'person', Text: 'Spoiled.', Desc: '', ParentId: 0 },
    //   { Id: 7, route: 'product', iconName: 'person', Text: 'Taste Bad.', Desc: '', ParentId: 5 },
    //   { Id: 8, route: 'product', iconName: 'person', Text: 'Too Ripe.', Desc: '', ParentId: 5 },
    //   { Id: 9, route: 'product', iconName: 'person', Text: 'Is not an apple.', Desc: '', ParentId: 5 },
    //   { Id: 10, route: 'product', iconName: 'person', Text: 'The apple was not green.', Desc: '', ParentId: 5 },
    //   { Id: 11, route: 'product', iconName: 'person', Text: 'Spoiled.', Desc: '', ParentId: 6 },
    //   { Id: 12, route: 'product', iconName: 'person', Text: 'Taste Bad.', Desc: '', ParentId: 6 },
    //   { Id: 13, route: 'product', iconName: 'person', Text: 'Too Ripe.', Desc: '', ParentId: 6 },
    //   { Id: 14, route: 'product', iconName: 'person', Text: 'Is not an apple.', Desc: '', ParentId: 6 },
    //   { Id: 15, route: 'product', iconName: 'person', Text: 'The apple was not green.', Desc: '', ParentId: 6 },
    //   { Id: 16, route: 'product', iconName: 'person', Text: 'The apple was not green.', Desc: '', ParentId: 0 },
    //   { Id: 17, route: 'product', iconName: 'person', Text: 'Is not an apple.', Desc: '', ParentId: 16 },
    //   { Id: 18, route: 'product', iconName: 'person', Text: 'Is is child to child.', Desc: '', ParentId: 17 },
    // ]

    var tree = function (data_off, root) {
      const
        next = { ChildAnswers: 'ChildAnswers', ChildQuestion: 'ChildAnswers' },
        toggle = type => ({ children, ...o }) =>
          Object.assign(o, children && { [type]: children.map(toggle(next[type])) }),
        t = {};

      data_off.forEach(o => {
        Object.assign(t[o.Id] = t[o.Id] || {}, o);
        t[o.ParentId] = t[o.ParentId] || {};
        t[o.ParentId].children = t[o.ParentId].children || [];
        t[o.ParentId].children.push(t[o.Id]);
      });
      return t[root].children.map(toggle('ChildAnswers'));
    }(data_off, 0);
    return tree;

  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  logMessage(value) {
    //console.log(value);
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.appDrawerRight = this.appDrawerRight;
  }
}
