import { Component, OnInit } from '@angular/core';
import { Ecom_Commercial } from 'src/app/commercial/Commercial';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  isItemLocalStorage: any;
  itemState: any[];
  newline: Ecom_Commercial;
  totalItemsCount: any;
  commercialModels: any;
  totalItemsPrice: any;

  constructor() { }

  ngOnInit() {
  }

  public AddToBag(itemObj) {

    if (Object.keys(itemObj).length !== 0) {

      this.HasThisItem(itemObj);
      if (this.isItemLocalStorage) {

        var hasitemdata = JSON.parse(localStorage.getItem('item'));
        this.itemState = [];
        Object.keys(hasitemdata).forEach(key => {
          const iteming = hasitemdata[key];
          const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
          const addItem = Object.keys(itemObj).map(key => itemObj[key]);
          if (storageItem[0] == addItem[0]) {
            var totalQty = storageItem[2] + 1;
            var totalPrice = storageItem[3] + addItem[6];
            var close = 'X';
            var add = 'V';
            this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice, close, add);
          }
        });
        this.itemState.push(this.newline);
        localStorage.setItem('item', JSON.stringify(this.itemState));
      } else {
        this.newline = new Ecom_Commercial(itemObj.PId, itemObj.PName, 1, itemObj.UnitPrice, 'X', 'A+');
        this.itemState.push(this.newline);
        localStorage.setItem('item', JSON.stringify(this.itemState));
      }
      this.LoadItemTotal();

    } else {
      this.newline = new Ecom_Commercial(itemObj.PId, itemObj.PName, 1, itemObj.UnitPrice, 'X', 'A+');
      this.itemState.push(this.newline);
      localStorage.setItem('item', JSON.stringify(this.itemState));
      this.LoadItemTotal();
    }
  }
  public HasThisItem(itemObj: any) {
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null) {
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
        const addItem = Object.keys(itemObj).map(key => itemObj[key]);

        if (storageItem[0] == addItem[0]) {
          return this.isItemLocalStorage = true

        } else {
          return this.isItemLocalStorage = false;
        }
      });
    } else {
      return this.isItemLocalStorage = false;
    }
  }
  public LoadItemTotal() {
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
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
  }
  public setTotalPrice(totalItemsPrice) {
    this.totalItemsPrice = totalItemsPrice;
  }
  public RemoveFromBag(itemObj) {
    if (Object.keys(itemObj).length !== 0) {
      this.HasThisItem(itemObj);
      if (this.isItemLocalStorage) {
        var hasitemdata = JSON.parse(localStorage.getItem('item'));
        if (hasitemdata != null) {
          this.itemState = [];
          Object.keys(hasitemdata).forEach(key => {
            const iteming = hasitemdata[key];
            const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
            const addItem = Object.keys(itemObj).map(key => itemObj[key]);
            if (storageItem[0] == addItem[0] && storageItem[2] > 1) {
              var totalQty = storageItem[2] - 1;
              var totalPrice = storageItem[3] - addItem[6]
              this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice, 'X', 'A+');
              this.itemState.push(this.newline);
            }
            else {
              // var totalQty = storageItem[2] - 1;
              // var totalPrice = storageItem[3] - addItem[6]
              // this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice);
              //this.itemState.push(this.newline);            
            }
          });

          localStorage.setItem('items', JSON.stringify(this.itemState));
          this.LoadItemTotal();
        }
      }
      else {

      }
    }
  }
  public DeleteRow(item) {
    //alert('hi')
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null) {
      this.itemState = [];
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
        const addItem = Object.keys(item).map(key => item[key]);
        if (storageItem[0] != addItem[0]) {
          var totalQty = storageItem[2];
          var totalPrice = storageItem[3]
          this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice, 'X', 'A+');
          this.itemState.push(this.newline);
        }
        else {
          // var totalQty = storageItem[2] - 1;
          // var totalPrice = storageItem[3] - addItem[6]
          // this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice);
          //this.itemState.push(this.newline);            
        }
      });

      localStorage.setItem('item', JSON.stringify(this.itemState));
      this.LoadItemTotal();
    }
  }
  public AddRowQty(item) {
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null) {
      this.itemState = [];
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
        const addItem = Object.keys(item).map(key => item[key]);
        if (storageItem[0] != addItem[0]) {
          var totalQty = storageItem[2];
          var totalPrice = storageItem[3]
          this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice, 'X', 'A+');
          this.itemState.push(this.newline);
        }
        else {
          var _totalQty = storageItem[2] + 1;
          var _totalPrice = storageItem[3] + addItem[3]
          this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], _totalQty, _totalPrice, 'X', 'A+');
          this.itemState.push(this.newline);
        }
      });

      localStorage.setItem('item', JSON.stringify(this.itemState));
      this.LoadItemTotal();
    }
    else {
      alert('LocalStorage Is Null');
    }
  }
  public AddRowQtyAfter(item) {
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null) {
      this.itemState = [];
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
        const addItem = Object.keys(item).map(key => item[key]);
        if (storageItem[0] != addItem[0]) {
          var totalQty = storageItem[2];
          var totalPrice = storageItem[3]
          this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice, 'X', 'A+');
          this.itemState.push(this.newline);
        }
        else {
          var _totalQty = storageItem[2] + 1;
          var _totalPrice = storageItem[3] + addItem[6]
          this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], _totalQty, _totalPrice, 'X', 'A+');
          this.itemState.push(this.newline);
        }
      });

      localStorage.setItem('item', JSON.stringify(this.itemState));
      this.LoadItemTotal();
    }
    else {
      alert('LocalStorage Is Null');
    }
  }
}
