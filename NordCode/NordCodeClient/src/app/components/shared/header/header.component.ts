import { Component, OnInit } from '@angular/core';
import { Ecom_Commercial } from 'src/app/commercial/Commercial';

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

  constructor() { }
  totalItemsCount = 0;
  ngOnInit() {
    localStorage.setItem('item', null);
    //this.LoadItemTotal();  
  }
  public LoadItemTotal() {
    //debugger;
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null && Object.keys(hasitemdata).length !== 0) {
      var _totalItemsPrice = 0;
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const intervale = Object.keys(iteming).map(key => iteming[key]);
        _totalItemsPrice = _totalItemsPrice + intervale[3];
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


  openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}

