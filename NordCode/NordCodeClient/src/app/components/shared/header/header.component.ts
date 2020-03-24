import { Component, OnInit } from '@angular/core';
import { Ecom_Commercial } from 'src/app/commercial/Commercial';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  displayedColumns: string[] = ['Add', 'Name', 'Qty', 'UnitPrice', 'Close'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  commercialModels = [];
  totalItemsPrice: any;
  itemState: any[];
  newline: Ecom_Commercial;
  isOpen: any = false;
  badgeCounter: number;

  constructor(private router: Router) { }
  totalItemsCount = 0;
  ngOnInit() {
    this.badgeCounter = 0;
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null && Object.keys(hasitemdata).length !== 0) {
      this.badgeCounter = Object.keys(hasitemdata).length
    }
  }
  public PlaceOrder(totalPrice) {
    if (this.CheckUserSession()) {
      this.router.navigate(['/checkout', totalPrice])
    } else {
      this.router.navigate(['/login'])
    }
  }
  public CheckUserSession() {
    debugger;
    var user = localStorage.getItem('user');
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
  public LoadItemTotal() {
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null && Object.keys(hasitemdata).length !== 0) {
      var _totalItemsPrice = 0;
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const intervale = Object.keys(iteming).map(key => iteming[key]);
        _totalItemsPrice = _totalItemsPrice + intervale[4];
      });
      // alert('Total Price is Final :'+ _totalItemsPrice);
      this.setTotalPrice(_totalItemsPrice);
      this.totalItemsCount = hasitemdata.length;
      this.commercialModels = hasitemdata;
    } else {
      this.setTotalPrice(0);
      this.totalItemsCount = 0;
      this.commercialModels = [];
    }
  }
  public setTotalPrice(totalItemsPrice) {
    this.totalItemsPrice = totalItemsPrice;
  }
  public DeleteRow(item) {
    //alert('hi')
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (Object.keys(hasitemdata).length !== 0 && hasitemdata != null) {
      this.itemState = [];
      const deleteItem = Object.keys(item).map(key => item[key]);
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
        if (storageItem[0] != deleteItem[0]) {
          this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], storageItem[2], storageItem[3], 'X', 'A+');
          this.itemState.push(this.newline);
          //localStorage.setItem('item', JSON.stringify(this.itemState));
        }
      });
      localStorage.setItem('item', JSON.stringify(this.itemState));
    }
    this.LoadItemTotal();
  }
  public openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  public closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  public openCartNav() {
    this.LoadItemTotal();
    if (!this.isOpen) {
      document.getElementById("cartnav").style.width = "350px";
      this.isOpen = true;
    } else {
      document.getElementById("cartnav").style.width = "0";
      this.isOpen = false;
    }
  }
  public logout(){
    //alert('hi')
    localStorage.setItem('user', null);
    localStorage.setItem('item', null);
    this.router.navigate(['/']);
  }
}

