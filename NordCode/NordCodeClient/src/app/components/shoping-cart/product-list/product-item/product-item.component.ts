import { Component, OnInit, Input } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';
import { Ecom_Commercial } from 'src/app/models/Commercial';
import { DialogpdetailsComponent } from 'src/app/components/common/dialogpdetails/dialogpdetails.component';
import { MatDialog } from '@angular/material';
import { Cart } from 'src/app/models/Cart';
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
  _cartItems: any;
  totalItems: any = 0;
  totalAmounts: number;
  expression: boolean;
  constructor(private dialog: MatDialog, private productService: ProductService, private _interactionService: InteractionService) { }

  ngOnInit() {
    ////////////// Here New Concept  ///////////////
    // this._interactionService.getForAddtoCart().subscribe((product: Ecom_Product) => {
    //     this._getTotalAmounts(product.PID);
    // });
    ////////////// Here New Concept  ///////////////
    this.expression = false;
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
    this._interactionService.sendForAddtoCart(this.featureItem);
    this._getTotalAmounts(this.featureItem.PID);
  }
  onRemoveFromBag() {
    this._interactionService.sendForRemoveFromCart(this.featureItem);
    this._getTotalAmounts(this.featureItem.PID);
  }
  public addProductToCart(cart: Cart) {
    
    let productExits = false;
    this._cartItems = this.productService._cartItems;
    for (let key in this._cartItems) {
      if (this._cartItems[key].PID === cart.PID) {
        this._cartItems[key].Qty++;
        this._cartItems[key].totalItems++;
        productExits = true;
        break;
      }
    }

    if (!productExits) {
      this._cartItems.push({ Add: '+', PID: cart.PID, ImgPath: cart.ImgPath, PName: cart.PName, Qty: 0, UnitPrice: cart.UnitPrice, Close: 'X' });
      console.log(JSON.stringify(this._cartItems));
    }
    
    this._interactionService.sendForAddtoCart(this.featureItem);
    this._getTotalAmounts(cart.PID);
  }
  public _getTotalAmounts(pid) {
    this._cartItems = this.productService._cartItems;
    
    this.totalAmounts = 0;
    if (this._cartItems != null) {
      this._cartItems.forEach((item) => {
        this.totalAmounts += (item.Qty * item.UnitPrice);
        if (item.PID == pid) {
          //this.totalItems = item.Qty;         
          this.featureItem.totalItems = item.Qty
        }
      });
    }
  }
  openDialog(feature_Item): void {
    this._getTotalAmounts(feature_Item.PID);    
    feature_Item.Qty = this.totalItems;
    const dialogRef = this.dialog.open(DialogpdetailsComponent, {
      panelClass: 'custom-dialog-container',
      autoFocus: false, maxHeight: '90vh', width: '950px', data: feature_Item

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ////////////// Here New Concept  ///////////////
}
