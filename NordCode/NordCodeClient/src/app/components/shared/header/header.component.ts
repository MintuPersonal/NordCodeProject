import { Component, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
import { Ecom_Menu } from 'src/app/models/Menu';
import { NavItem } from 'src/app/models/nav-item';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  _cartItems = [];
  totalItem: number = 0;

  totalAmounts: number = 0;
  totalNetAmounts: number = 0;
  //totalDiscount: number = 0;
  condition: boolean;
  animal: any;
  name: any;
  newline: Ecom_Commercial;
  itemState: any[];
  commercialModels: any;
  customerId: number = 0;
  featureItem: Cart;
  data: any;
  pCategoryName: string;
  featuresModel: any;
  logincondition: boolean = false;

  navItems: NavItem[];
  menuItems: object;
  mySubscription: any;
  menuObj: Object[];
  aMenu: Ecom_Menu;
  newitem: Ecom_Menu[];
  newnav: NavItem;

  // ===================
  private items: any[];
  private hoverItem: any = null;

  private ctrlStyle: any = {
    general: {
      normal: 'treeview-pec-normal'
    }
  }
  item: any[];


  constructor(private router: Router, private dialog: MatDialog,
    protected alertService: AlertService, public navService: NavbarService,
    private interactionService: InteractionService, private productService: ProductService,
    private customerService: CustomerService) {
    //this.logincondition = this.CheckUserSession();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

    navService.getmenus('admin').subscribe((menus: any) => {
      const distinctThings = menus.data.filter(
        (thing, i, arr) => arr.findIndex(t => t.Text === thing.Text) === i
      );

      this.navItems = this.RenderMenu(distinctThings);
    })
    this.logMessage(this.navItems)

  }
  private RenderMenu(data_off: any): NavItem[] {

    var tree = function (data_off, root) {
      const
        next = { ChildAnswers: 'ChildAnswers', ChildQuestion: 'ChildAnswers' },
        toggle = type => ({ children, ...o }) =>
          Object.assign(o, children && { [type]: children.map(toggle(next[type])) }),
        t = {};

      data_off.forEach(o => {
        Object.assign(t[o.Id] = t[o.Id] || {}, o);
        t[o.ParentId] = t[o.ParentId] || {};
        t[o.ParentId].children = t[o.ParentId].children || [];
        t[o.ParentId].children.push(t[o.Id]);
      });
      return t[root].children.map(toggle('ChildAnswers'));
    }(data_off, 0);
    return tree;

  }
  logMessage(value) {
    console.log(value);
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

    ////////////// Here New Concept  ///////////////
    this.interactionService.getForAddtoCart().subscribe((product: Cart) => {
      if (!this.productService.fromproductlist) {
        this.addProductToCart(product);
      } else {
        this._getTotalAmounts();
        this.productService.fromproductlist = false;
      }
    });
    this._getTotalAmounts();
    ////////////// Here New Concept  ///////////////
    if (this.CheckUserSession()) {

      var customerInfo = JSON.parse(localStorage.getItem('customerInfo'));
      if (customerInfo == "" || customerInfo == "undefined" || customerInfo == null) {
        this.logincondition = false;
      } else {
        this.userName = 'Logged ' + customerInfo.Name
        this.logincondition = true;
      }
    }

    this.interactionService.getForLoginUpdate().subscribe((data: Customer) => {

      if (data) {
        this.userName = 'Logged ' + data.Name;
        this.logincondition = true;
      } else {
        this.logincondition = false;
      }
    });
  }

  public onAddToBag(featureItem) {
    featureItem.totalItems = featureItem.Qty;
    this.interactionService.sendForAddtoCart(featureItem);
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
      this.totalItem = this._cartItems.length;
      this.totalAmounts = 0;
      //this.totalDiscount = 0;
      this._cartItems.forEach((item) => {
        this.totalAmounts += (item.Qty * item.UnitPrice);
        this.totalNetAmounts += (item.Qty * item.MRP);
       /// this.totalDiscount = this.totalNetAmounts - this.totalNetAmounts
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
  public CheckUserSession(): boolean {
    var user = JSON.parse(localStorage.getItem('currentUser'));

    if (user == "" || user == "undefined" || user == null) {
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
    //this.router.navigate(['/']);
    this.logincondition = false;
    localStorage.setItem('currentUser', JSON.stringify(''));
    this.CheckUserSession();
  }
  public PhoneLogin() {

    this.router.navigate(['/login']);
  }
  public PlaceOrder(totalPrice: any) {
    var order = this.productService.GetOrder();
    this.totalAmounts = order.TotalPrice;
    //this.totalDiscount = order.Discount;
    this.totalItem = order.TotalItemQty;
    this.customerService.SetOrder(order).subscribe();
    this.productService.SetEmptyCart();

    if (this.CheckUserSession() && order.TotalPrice != 0) {
      this.router.navigate(['/checkout', order.TotalPrice]);
    } else {
      this.productService.logincondition = 1;
      this.router.navigate(['/login']);
    }
  }
  public Search() {
    this.router.navigate(['/']);
    if (this.pCategoryName != "") {

      this.productService.SetProductScearchFilter(this.pCategoryName);
      this.router.navigate(['/search', this.pCategoryName]);
    }
    else {
      this.router.navigate(['/']);
    }
  }
  ////////////// Here New Concept  ///////////////

}

