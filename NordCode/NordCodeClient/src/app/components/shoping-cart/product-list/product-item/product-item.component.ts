import { Component, OnInit, Input } from '@angular/core';
import { Ecom_Commercial } from 'src/app/commercial/Commercial';
import { CommercialService } from 'src/app/commercial/commercial.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  commercialObj: object[];
  _commercialModel: any;
  categoriesModel: any;
  bannersModel: any;
  brandsModel: any;
  featuresModel: any;

  @Input() featureItem: any;
  constructor(private _commercialService: CommercialService) { }

  ngOnInit() {
    localStorage.setItem('item', null);
    //this.LoadItemTotal();
  }
  public LoadItemTotal() {
    //
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
  public AddToBag(itemObj) {
    
    if (Object.keys(itemObj).length !== 0) {
      this.HasThisItem(itemObj);
      this.itemState = [];
      if (this.isItemLocalStorage) {
        this.AddExitsItem(itemObj);
      } else {
        this.newline = new Ecom_Commercial(itemObj.PId, itemObj.PName, 1, itemObj.UnitPrice, 'X', 'A+');
        this.AddNewItem(this.newline);
      }
      this.LoadItemTotal();

    } else {
      this.newline = new Ecom_Commercial(itemObj.PId, itemObj.PName, 1, itemObj.UnitPrice, 'X', 'A+');
      this.itemState.push(this.newline);
      localStorage.setItem('item', JSON.stringify(this.itemState));
      this.LoadItemTotal();
    }
  }
  AddExitsItem(existed) {
    this.itemState = [];
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    Object.keys(hasitemdata).forEach(key => {
      const iteming = hasitemdata[key];
      const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
      const addItem = Object.keys(existed).map(key => existed[key]);
      if (storageItem[0] == addItem[0]) {
        var totalQty = storageItem[2] + 1;
        var totalPrice = storageItem[3] + addItem[6];
        var close = 'X';
        var add = 'V';
        this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice, close, add);
        this.itemState.push(this.newline);
        //
      } else {
        this.itemState.push(iteming);
        //localStorage.setItem('item', JSON.stringify(this.itemState)); 
      }
    });
    localStorage.setItem('item', JSON.stringify(this.itemState));
  }
  public AddNewItem(newline) {
    this.itemState = [];
    this.itemState.push(newline);
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null) {
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        this.itemState.push(iteming);
      });
      localStorage.setItem('item', JSON.stringify(this.itemState));
    }
    localStorage.setItem('item', JSON.stringify(this.itemState));
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
