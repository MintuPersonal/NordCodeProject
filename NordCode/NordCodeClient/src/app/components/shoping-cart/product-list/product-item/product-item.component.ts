import { Component, OnInit, Input } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';
import { Ecom_Commercial } from 'src/app/models/Ecom_Commercial';
import { DialogpdetailsComponent } from 'src/app/components/common/dialogpdetails/dialogpdetails.component';
import { MatDialog } from '@angular/material';
import { Ecom_Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

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
  name: string;
  animal: string;
  cartItems: any;
  totalItems: any = 0;
  totalAmounts: number;
  constructor(private dialog: MatDialog, private productService: ProductService, private _interactionService: InteractionService) { }

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
    debugger;
    this._interactionService.sendForAddtoCart(this.featureItem);
    this._getTotalAmounts();
  }

  // public addProductToCart(product: Ecom_Product) {

  //   let productExits = false;
  //   this.cartItems = this.productService.cartItems;
  //   for (let key in this.cartItems) {
  //     if (this.cartItems[key].PID === product.PID) {
  //       this.cartItems[key].Qty++;
  //       productExits = true;
  //       break;
  //     }
  //   }

  //   if (!productExits) {
  //     this.cartItems.push({
  //       Add: '+', PID: product.PID, PName: product.PName, Qty: 1, UnitPrice: product.UnitPrice, Close: 'X'
  //     });
  //   }
  //   this._getTotalAmounts();
  // }



  onRemoveFromBag() {
    this._interactionService.sendForRemoveFromCart(this.featureItem);
    this._getTotalAmounts();
  }

  private _getTotalAmounts() {
    this.cartItems = this.productService.cartItems;
    this.totalItems = this.cartItems.length;
    this.totalAmounts = 0;
    this.cartItems.forEach((item) => {
      this.totalAmounts += (item.Qty * item.UnitPrice);
    });
  }
  openDialog(featureItem): void {
    debugger;
    const dialogRef = this.dialog.open(DialogpdetailsComponent, {
      width: '950px', data: featureItem

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }



  // public openDialog(): void {
  //   //if (!this.condition) {
  //   this.name = 'New Product'
  //   this.animal = '10'
  //   const dialogRef = this.dialog.open(DialogpdetailsComponent, { width: '950px', data: { name: this.name, animal: this.animal } });

  //   dialogRef.afterClosed().subscribe(result => {

  //   });
  //   // } else {
  //   //   firebase.auth().signOut().then((data) => {
  //   //     this.condition = false;
  //   //   });
  //   // }
  // }
  ////////////// Here New Concept  ///////////////
}
