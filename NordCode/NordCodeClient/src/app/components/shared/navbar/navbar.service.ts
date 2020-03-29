import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NavbarService {
  public appDrawer: any;
  public appDrawerRight: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  opened: any;
  isOpen: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {    
      this.appDrawer.close();
      this.opened = false;    
  }

  public openNav() {   
    if(this.opened){
      this.appDrawer.close();
      this.opened = false;
    }else{
      this.appDrawer.open();
      this.opened = true;
    }
  }

  public openNavRight() {      
    // if(this.opened){
    //   this.appDrawerRight.close();
    //   this.opened = false;
    // }else{
    //   this.appDrawerRight.open();
    //   this.opened = true;
    // }
  }

  public openNavCart() {
    //this.LoadItemTotal();
    if (!this.isOpen) {
      document.getElementById("cartnav").style.width = "350px";      
      this.isOpen = true;
    } else {
      document.getElementById("cartnav").style.width = "0";
      document.getElementById("cartnav").style.height = "350px";
      this.isOpen = false;
    }
  }

}