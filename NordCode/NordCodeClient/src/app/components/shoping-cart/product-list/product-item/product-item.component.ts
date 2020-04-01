import { Component, OnInit, Input } from '@angular/core';
//import { Ecom_Commercial } from 'src/app/models/Product';
import { ProductListService } from '../../../../services/product-list.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Ecom_Commercial } from 'src/app/models/Ecom_Commercial';

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
  close = 'X';
  add = 'A+';


  //////////////// New Concept ////////
  @Input() featureItem: any;
  constructor(private productService: ProductListService, private _interactionService: InteractionService) { }

  ngOnInit() {
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
  public AddToBag(itemObj) {

    this.productService.AddtoItems(itemObj);

    //this.badgeCounter = 0;
    if (Object.keys(itemObj).length !== 0) {
      this.HasThisItem(itemObj);
      this.itemState = [];
      if (this.isItemLocalStorage) {
        this.AddExitsItem(itemObj);
      } else {
        this.newline = new Ecom_Commercial(this.add, itemObj.PID, itemObj.PName, 1, itemObj.UnitPrice, this.close);
        this.AddNewItem(this.newline);
      }
      this.LoadItemTotal();

    } else {
      this.newline = new Ecom_Commercial(this.add, itemObj.PId, itemObj.PName, 1, itemObj.UnitPrice, this.close);
      this.itemState.push(this.newline);
      localStorage.setItem('item', JSON.stringify(this.itemState));
      this.LoadItemTotal();
    }
  }
  public AddExitsItem(existed) {
    this.itemState = [];
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    Object.keys(hasitemdata).forEach(key => {
      const iteming = hasitemdata[key];
      const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
      const addItem = Object.keys(existed).map(key => existed[key]);
      if (storageItem[1] == addItem[0]) {
        var totalQty = storageItem[3] + 1;
        var totalPrice = storageItem[4] + addItem[6];

        this.newline = new Ecom_Commercial(this.add, storageItem[1], storageItem[1], totalQty, totalPrice, this.close);
        this.itemState.push(this.newline);
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

        if (storageItem[1] == addItem[0]) {
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
            if (storageItem[1] == addItem[1] && storageItem[3] > 1) {
              var totalQty = storageItem[2] - 1;
              var totalPrice = storageItem[3] - addItem[6]
              this.newline = new Ecom_Commercial(this.add, storageItem[1], storageItem[1], totalQty, totalPrice, this.close);
              this.itemState.push(this.newline);
            }
            else {
              // var totalQty = storageItem[2] - 1;
              // var totalPrice = storageItem[3] - addItem[6]
              // this.newline = new Ecom_Commercial(storageItem[1], storageItem[1], totalQty, totalPrice);
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
        if (storageItem[1] != addItem[0]) {
          var totalQty = storageItem[2];
          var totalPrice = storageItem[3]
          this.newline = new Ecom_Commercial(this.add, storageItem[1], storageItem[1], totalQty, totalPrice, this.close);
          this.itemState.push(this.newline);
        }
        else {
          var _totalQty = storageItem[2] + 1;
          var _totalPrice = storageItem[3] + addItem[3]
          this.newline = new Ecom_Commercial(this.add, storageItem[1], storageItem[1], _totalQty, _totalPrice, this.close);
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
        if (storageItem[1] != addItem[0]) {
          var totalQty = storageItem[2];
          var totalPrice = storageItem[3]
          this.newline = new Ecom_Commercial(this.add, storageItem[1], storageItem[1], totalQty, totalPrice, this.close);
          this.itemState.push(this.newline);
        }
        else {
          var _totalQty = storageItem[2] + 1;
          var _totalPrice = storageItem[3] + addItem[6]
          this.newline = new Ecom_Commercial(this.add, storageItem[1], storageItem[1], _totalQty, _totalPrice, this.close);
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

  ////////////// Here New Concept  ///////////////
  onAddToBag() {
    this._interactionService.sendForAddtoCart(this.featureItem);
  }

  onRemoveFromBag() {
    this._interactionService.sendForRemoveFromCart(this.featureItem);
  }
  ////////////// Here New Concept  ///////////////
}
