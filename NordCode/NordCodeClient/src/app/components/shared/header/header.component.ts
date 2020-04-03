import { Component, OnInit } from '@angular/core';
import { Ecom_Product } from 'src/app/models/Product';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { AlertService } from 'src/app/test/_alert';
import { NavbarService } from '../../../services/navbar.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ProductService } from 'src/app/services/product.service';
import { Ecom_Commercial } from 'src/app/models/Ecom_Commercial';
import { LoginService } from 'src/app/services/login.service';


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
  totalItems: number = 0;
  totalAmounts: number;
  cartItems = [];
  condition: boolean;
  animal: any;
  name: any;
  newline: Ecom_Commercial;
  itemState: any[];
  commercialModels: any;
  constructor(private router: Router, private dialog: MatDialog,
    protected alertService: AlertService, public navService: NavbarService,
    private _interactionService: InteractionService, private productService: ProductService) {

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
    this._interactionService.getForAddtoCart().subscribe((product: Ecom_Product) => {
      if (!this.productService.fromproductlist) {
        this.addProductToCart(product);
      } else {
        this._getTotalAmounts();
        this.productService.fromproductlist = false;
      }
    });
    ////////////// Here New Concept  ///////////////
  }

  public addProductToCart(product: Ecom_Product) {

    let productExits = false;
    this.cartItems = this.productService.cartItems;
    for (let key in this.cartItems) {
      if (this.cartItems[key].PID === product.PID) {
        this.cartItems[key].Qty++;
        productExits = true;
        break;
      }
    }

    if (!productExits) {
      this.cartItems.push({
        Add: '+', PID: product.PID, PName: product.PName, Qty: 1, UnitPrice: product.UnitPrice, Close: 'X'
      });
    }

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

  public RemoveProductFromCart(product: Ecom_Product, fromproductlist: boolean) {
    this.productService.RemoveProductFromCart(product, fromproductlist)
    this._getTotalAmounts();
  }
  public RemoveFromCart(index: number) {
    this.productService.RemoveFromCart(index);
    this._getTotalAmounts();
  }
  public PlaceOrder(totalPrice) {
    var data = this.CheckUserSession();
    if (data) {
      this.router.navigate(['/checkout'])
    } else {
      this.router.navigate(['/logindialog'])
    }
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
      const dialogRef = this.dialog.open(DialogComponent, { width: '450px', data: { name: this.name, animal: this.animal } });
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

  ////////////// Here New Concept  ///////////////










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
      this.totalItems = hasitemdata.length;
      this.commercialModels = hasitemdata;
    } else {
      this.setTotalPrice(0);
      this.totalItems = 0;
      this.commercialModels = [];
    }
  }
  public setTotalPrice(totalItemsPrice) {
    this.totalAmounts = totalItemsPrice;
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

}

