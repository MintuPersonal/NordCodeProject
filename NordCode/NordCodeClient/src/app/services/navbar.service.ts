import { EventEmitter, Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NavbarService {
  public appDrawer: any;
  public appDrawerRight: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  private opened: any;
  private isOpen: any;
  private isOpenMenu: any = true;

  constructor(private _http: HttpClient, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);

      }
    });
  }
  public getmenus(roleName) {
    return this._http.get(environment.baseurl + 'getmenus?roleName=' + roleName);
  }
  public closeNav() {
    this.appDrawer.close();
    this.opened = false;
  }
  public openNav() {
    if (this.opened) {
      this.appDrawer.close();
      this.opened = false;
    } else {
      this.appDrawer.open();
      this.opened = true;
    }
  }
  public openNavCart() {
    if (!this.isOpen) {
      document.getElementById("cartnav").style.width = "350px";
      document.getElementById("menucart").style.visibility = "hidden";
      this.isOpen = true;
    } else {
      document.getElementById("cartnav").style.width = "0";
      document.getElementById("menucart").style.visibility = "visible";      
      this.isOpen = false;
    }
  }

  public openNavMenu() {   
    if (!this.isOpenMenu) {
      document.getElementById("menunav").style.width = "245px";
      this.isOpenMenu = true;
    } else {
      document.getElementById("menunav").style.width = "0";
      this.isOpenMenu = false;
    }
  }

  // public openNavCart() {
  //   if (!this.isOpen) {
  //     document.getElementById("cartnav").style.display = "block";
  //     this.isOpen = true;
  //   } else {
  //     document.getElementById("cartnav").style.display = "none";
  //     this.isOpen = false;
  //   }
  // }
}