import { Component, OnInit } from '@angular/core';
import { CommercialService } from './commercial.service';
import { Ecom_Commercial } from './Commercial';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})

export class CommercialComponent implements OnInit {
  featuresModels: any;
  commercialObj: object[];
  categoriesModel: any;
  bannersModel: any;
  brandsModel: any;
  featuresModel: any;
  newitems: Ecom_Commercial[];
  newData: Ecom_Commercial[];
  itemPrice: any;

  totalItemsPrice: any = 0;
  totalItemsCount: any = 0;
  individualItemCount: any = 0;
  itemState: Ecom_Commercial[] = [];
  itemCount: number = 0;
  newline: Ecom_Commercial;
  isItemLocalStorage: any;

  constructor(private _commercialService: CommercialService) { }
  //commercialModel = new Ecom_Commercial(0, '', 0, 0);
  _commercialModel: Object[];
  commercialModels = [] //Ecom_Commercial[];

  ngOnInit() {
    localStorage.setItem('item', null);
    this._commercialService.getCommercial().subscribe(
      data => {
        this.commercialObj = data as object[];	 // FILL THE ARRAY WITH DATA.
        this._commercialModel = this.commercialObj['homeobj'];

        this.categoriesModel = this._commercialModel['categories'];
        this.bannersModel = this._commercialModel['banners'];
        this.brandsModel = this._commercialModel['brands'];
        this.featuresModel = this._commercialModel['features'];

      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )

    // this.HasThisItem({});
  }

  AddToBag(itemObj) {
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
            var totalPrice = storageItem[3] + addItem[6]
            this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice);
          }
        });
        this.itemState.push(this.newline);
        localStorage.setItem('item', JSON.stringify(this.itemState));
      } else {
        this.newline = new Ecom_Commercial(itemObj.PId, itemObj.PName, 1, itemObj.UnitPrice);
        this.itemState.push(this.newline);
        localStorage.setItem('item', JSON.stringify(this.itemState));
      }
      this.LoadItemTotal();

    } else {
      this.newline = new Ecom_Commercial(itemObj.PId, itemObj.PName, 1, itemObj.UnitPrice);
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
          this.isItemLocalStorage = true
          return false;
        } else {
          this.isItemLocalStorage = false;
          return false;
        }
      });
    } else {
      return this.isItemLocalStorage = false;
      return false;
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
              this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], totalQty, totalPrice);
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








  displayedColumns: string[] = ['Name', 'Qty', 'UnitPrice'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }

}
