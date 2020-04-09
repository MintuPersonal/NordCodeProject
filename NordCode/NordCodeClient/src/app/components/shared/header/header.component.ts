import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { AlertService } from 'src/app/test/_alert';
import { NavbarService } from '../../../services/navbar.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ProductService } from 'src/app/services/product.service';
import { Ecom_Commercial } from 'src/app/models/Commercial';
import { Cart } from 'src/app/models/Cart';
import { CustomerService } from 'src/app/services/customer.service';
import { Ecom_Orders } from 'src/app/models/Order';
import { environment } from 'src/environments/environment';
import { Ecom_OrderDetails } from 'src/app/models/OrderDetails';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = 'Mahafuz Huq'
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  _cartItems = [];
  _totalItem: number = 0;

  totalAmounts: number;
  condition: boolean;
  animal: any;
  name: any;
  newline: Ecom_Commercial;
  itemState: any[];
  commercialModels: any;
  customerId: number = 0;
  featureItem: Cart;
  data: any;

  //@Output() RefObject = new EventEmitter();

  constructor(private router: Router, private dialog: MatDialog,
    protected alertService: AlertService, public navService: NavbarService,
    private _interactionService: InteractionService, private productService: ProductService,
    private customerService: CustomerService) {

  }

  ngOnInit() {

    var firebaseConfig = {
      apiKey: "AIzaSyAABTcunn62aKYHkJGkfnr5JhXA-D9Ztak",
      authDomain: "otp-ecommerce.firebaseapp.com",
      databaseURL: "https://otp-ecommerce.firebaseio.com",
      projectId: "otp-ecommerce",
      storageBucket: "otp-ecommerce.appspot.com",
      messagingSenderId: "932041012966",
      appId: "1:932041012966:web:9936106c9ea4e508e42d27"
    };
    firebase.initializeApp(firebaseConfig);
    this.loginStatus();
    this.condition = this.CheckUserSession();
    ////////////// Here New Concept  ///////////////
    this._interactionService.getForAddtoCart().subscribe((product: Cart) => {
      if (!this.productService.fromproductlist) {
        this.addProductToCart(product);
      } else {
        this._getTotalAmounts();
        this.productService.fromproductlist = false;
      }
    });
    this._getTotalAmounts();
    ////////////// Here New Concept  ///////////////
  }

  onAddToBag(featureItem) {   
    debugger; 
    featureItem.totalItems = featureItem.Qty;
    this._interactionService.sendForAddtoCart(featureItem);
    this._getTotalAmounts(); //featureItem.PID
  }
  public addProductToCart(product: Cart) {

    let productExits = false;
    this._cartItems = this.productService._cartItems;
    for (let key in this._cartItems) {
      if (this._cartItems[key].PID === product.PID) {
        this._cartItems[key].Qty++;
        productExits = true;
        break;
      }
    }

    if (!productExits) {
      this._cartItems.push({
        Add: '+', PID: product.PID, ImgPath: product.ImgPath, PName: product.PName, Qty: 1, UnitPrice: product.UnitPrice, Close: 'X'
      });
    }

    this._getTotalAmounts();
  }
  private _getTotalAmounts() {
    this._cartItems = this.productService._cartItems;
    localStorage.setItem('item', JSON.stringify(this._cartItems));
    if (this._cartItems != null) {
      this._totalItem = this._cartItems.length;
      this.totalAmounts = 0;
      this._cartItems.forEach((item) => {
        this.totalAmounts += (item.Qty * item.UnitPrice);
      });
    };
  }

  public RemoveProductFromCart(product: Cart, fromproductlist: boolean) {
    this.productService.RemoveProductFromCart(product, fromproductlist)
    this._getTotalAmounts();
  }
  public RemoveFromCart(index: number) {
    this.productService.RemoveFromCart(index);
    this._getTotalAmounts();
  }
  public CheckUserSession() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if (user == "" || user == "undefined") {
      return false;
    } else {
      return true;
    }
  }
  public loginStatus(): boolean {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.phoneNumber = user.phoneNumber;
        console.log("USER LOGGED IN" + user.phoneNumber);
        localStorage.setItem('currentUser', JSON.stringify(user.phoneNumber));
        this.condition = true;

      } else {
        // No user is signed in.
        this.condition = false;
        console.log("USER NOT LOGGED IN");
      }
    });
    return this.condition;
  }
  public openDialog(): void {
    if (!this.condition) {
      const dialogRef = this.dialog.open(DialogComponent, { width: '500px', data: { name: this.name, animal: this.animal } });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      firebase.auth().signOut().then((data) => {
        this.condition = false;
      });
    }
  }
  public logout() {
    localStorage.setItem('currentUser', JSON.stringify(''));
    this.CheckUserSession();
    this.router.navigate(['/']);

  }
  public PlaceOrder(totalPrice: any) {
    if (this.CheckUserSession()) {
      var cartItems = this.productService._cartItems;
      var order = this._getOrder(cartItems);
      this.customerService.setOrder(order).subscribe();
      this.productService.SetEmptyCart();;
      this._getTotalAmounts();
      localStorage.setItem('item', null)

      this.router.navigate(['/payment', order.TONumber, order.TotalPrice]);
    } else {
      this.router.navigate(['/phonelogin']);
    }
  }

  private _getOrder(cartItems): Ecom_Orders {
    var order = new Ecom_Orders();
    var orderno = environment.currentuserId + '_' + Math.random().toString().slice(2, 11);
    var OrderDetails = [];
    cartItems.forEach((item: Cart) => {
      var orderdetail = new Ecom_OrderDetails();
      orderdetail.OrderId = 0;
      orderdetail.TONumber = orderno;

      orderdetail.PID = item.PID;
      orderdetail.PName = item.PName;
      orderdetail.PQty = item.Qty;
      orderdetail.ItemQty = item.Qty;
      orderdetail.UnitPrice = item.UnitPrice;
      orderdetail.NetPrice = item.UnitPrice;
      orderdetail.HostAddress = environment.baseurl;
      orderdetail.ImgPath = item.ImgPath;

      orderdetail.TrackedId = environment.baseurl;
      orderdetail.CreateBy = environment.currentuserId;
      orderdetail.CreateDate = new Date();
      orderdetail.UpdateBy = '';
      orderdetail.UpdateDate = new Date();
      orderdetail.Delete = false;
      orderdetail.Active = true;
      OrderDetails.push(orderdetail);
    });

    order.OID = 0;
    order.TONumber = orderno;
    order.CustomerId = 6; //this.customerId;
    order.PaymentId = 0;
    order.CouponId = 3333;
    order.PaymentModeId = 1;
    order.Discount = 20;
    order.Reason = '_orderReason';
    order.Active = true;
    
    order.TotalItemQty = 5;
    order.NetPrice = 6000;
    order.DeliveryCharge = 20;
    order.TotalPrice = 2000;
    order.Address = 'DDDD';
    order.Aria = '_orderAria';
    order.DeliveryTime = new Date();
    order.OrderStatus = 1;

    order.TrackedId = environment.baseurl;
    order.CreateBy = environment.currentuserId;
    order.CreateDate = new Date();
    order.Active = true;
    order.Delete = false;
    order.OrderDetails = OrderDetails;
    return order;
  }

  ////////////// Here New Concept  ///////////////










  // public LoadItemTotal() {
  //   var hasitemdata = JSON.parse(localStorage.getItem('item'));
  //   if (hasitemdata != null && Object.keys(hasitemdata).length !== 0) {
  //     var _totalItemsPrice = 0;
  //     Object.keys(hasitemdata).forEach(key => {
  //       const iteming = hasitemdata[key];
  //       const intervale = Object.keys(iteming).map(key => iteming[key]);
  //       _totalItemsPrice = _totalItemsPrice + intervale[4];
  //     });
  //     // alert('Total Price is Final :'+ _totalItemsPrice);
  //     this.setTotalPrice(_totalItemsPrice);
  //     this._totalItem = hasitemdata.length;
  //     this.commercialModels = hasitemdata;
  //   } else {
  //     this.setTotalPrice(0);
  //     this._totalItem = 0;
  //     this.commercialModels = [];
  //   }
  // }
  // public setTotalPrice(totalItemsPrice) {
  //   this.totalAmounts = totalItemsPrice;
  // }
  // public DeleteRow(item) {
  //   //alert('hi')
  //   var hasitemdata = JSON.parse(localStorage.getItem('item'));
  //   if (Object.keys(hasitemdata).length !== 0 && hasitemdata != null) {
  //     this.itemState = [];
  //     const deleteItem = Object.keys(item).map(key => item[key]);
  //     Object.keys(hasitemdata).forEach(key => {
  //       const iteming = hasitemdata[key];
  //       const storageItem = Object.keys(iteming).map(mapper => iteming[mapper]);
  //       if (storageItem[0] != deleteItem[0]) {
  //         this.newline = new Ecom_Commercial(storageItem[0], storageItem[1], storageItem[2], storageItem[3], 'X', 'A+');
  //         this.itemState.push(this.newline);
  //         //localStorage.setItem('item', JSON.stringify(this.itemState));
  //       }
  //     });
  //     localStorage.setItem('item', JSON.stringify(this.itemState));
  //   }
  //   this.LoadItemTotal();
  // }
  // public openNav() {
  //   document.getElementById("mySidepanel").style.width = "250px";
  //   document.getElementById("main").style.marginLeft = "250px";
  // }
  // public closeNav() {
  //   document.getElementById("mySidepanel").style.width = "0";
  //   document.getElementById("main").style.marginLeft = "0";
  // }

}

