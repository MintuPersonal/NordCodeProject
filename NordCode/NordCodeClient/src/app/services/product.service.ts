import { Injectable } from '@angular/core';
import { Ecom_Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/Cart';
import { Ecom_Orders } from '../models/Order';
import { Ecom_OrderDetails } from '../models/OrderDetails';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  ////////////// Here New Concept  ///////////////
  //_cartItems = [];
  fromproductlist: boolean = false;
  _cartItems: Cart[];
  _customerPonne: string;
  pCategoryName: any = '';
  _totalItem: number;
  totalAmounts: number;
  TONumber: string = '';
  TotalPrice: number = 0;
  MobileNo: string = '';
  CustomerID: number = 0;
  Address: string = 'Address';
  Area: string = 'Area'
  logincondition: boolean;
  customer: Customer;
  constructor(private _http: HttpClient) {
    this.TONumber = '';
    this.TotalPrice = 0;
    this.MobileNo = '';
    var data = localStorage.getItem("item");
    if (data == 'undefined' || data == "null") {
      this._cartItems = []
    } else {
      this._cartItems = JSON.parse(localStorage.getItem('item' || "null"));
    }

    // this._customerPonne = localStorage.getItem("currentUser");
    // if (this._customerPonne == 'undefined' || this._customerPonne == "null") {
    //   this.MobileNo = ''
    // } else {
    //   this.MobileNo = JSON.parse(localStorage.getItem('currentUser' || "null"));
    // }    
    this.GetCustomerID();

  }
  public SetEmptyCart(): Cart[] {
    localStorage.setItem('item', null);
    return this._cartItems = [];
  }
  public RemoveProductFromCart(product, fromproductlist) {
    this.fromproductlist = fromproductlist;
    let productExits = false;
    for (let key in this._cartItems) {
      if (this._cartItems[key].PID === product.PID && this._cartItems[key].Qty > 1) {
        this._cartItems[key].Qty--;
        productExits = true;
        break;
      }
    }
  }
  public RemoveFromCart(index: number) {
    if (index !== -1) {
      this._cartItems.splice(index, 1);

    }
  }
  public getCartItemsFromLocal() {
    return JSON.parse(localStorage.getItem('item'));
  }
  public getOrderFromLocal() {
    return JSON.parse(localStorage.getItem('order'));
  }
  public SetProductScearchFilter(categoryname) {
    this.pCategoryName = categoryname;
  }
  public GetOrder(): Ecom_Orders {
    localStorage.setItem('item', JSON.stringify(this._cartItems));
    this.customer = JSON.parse(localStorage.getItem('customerInfo' || "null"));

    var order = new Ecom_Orders();
    this.TONumber = '11_' + Math.random().toString().slice(2, 11);
    this.TotalPrice = 0;
    var TNetPrice = 0;
    var OrderDetails = [];
    this._cartItems.forEach((item: Cart) => {
      var orderdetail = new Ecom_OrderDetails();
      orderdetail.OrderId = 0;
      orderdetail.TONumber = this.TONumber;

      orderdetail.PID = item.PID;
      orderdetail.PName = item.PName;
      orderdetail.PQty = item.Qty;
      orderdetail.ItemQty = item.Qty;
      orderdetail.UnitPrice = item.UnitPrice;
      orderdetail.NetPrice = item.NetPrice ? 0 : item.UnitPrice;
      orderdetail.HostAddress = environment.baseurl;
      orderdetail.ImgPath = item.ImgPath;

      orderdetail.TrackedId = 'http://demo.one-ict.com:3000/api/'; //environment.baseurl;
      orderdetail.CreateBy = '11';//environment.currentuserId;
      orderdetail.CreateDate = new Date();
      orderdetail.UpdateBy = '';
      orderdetail.UpdateDate = new Date();
      orderdetail.Delete = false;
      orderdetail.Active = true;
      OrderDetails.push(orderdetail);
      this.TotalPrice = this.TotalPrice + (item.UnitPrice * item.Qty);
      TNetPrice = TNetPrice + (item.UnitPrice * item.Qty);
    });

    order.OID = 0;
    order.TONumber = this.TONumber;
    order.CustomerId = this.customer.CID;
    order.PaymentId = 0;
    order.CouponId = 3333;
    order.PaymentModeId = 1;
    order.Discount = 20;
    order.Reason = '_orderReason';
    order.Active = true;

    order.TotalItemQty = this._cartItems.length;
    order.DeliveryCharge = 20;
    order.TotalPrice = this.TotalPrice;
    order.NetPrice = TNetPrice;
    order.Address = this.customer.Address;
    order.Area = this.customer.Area;
    order.DeliveryTime = new Date();
    order.OrderStatus = 1;

    order.TrackedId = 'http://demo.one-ict.com:3000/api/'; //environment.baseurl;
    order.CreateBy = '11'; //environment.currentuserId;
    order.CreateDate = new Date();
    order.Active = true;
    order.Delete = false;
    order.OrderDetails = OrderDetails;
    return order;
  }
  public GetStayThisPage(): boolean {
    if (this.TONumber == "" && this.TotalPrice == 0) {
      this.SetEmptyCart();
      return false;
    } else {
      return true;
    }
  }
  public GetCustomerID(): number {
    if (!this.CustomerID) {
      this.CustomerID = parseInt(JSON.parse(localStorage.getItem('currentUser')));
    } else {
      return this.CustomerID;
    }

  }
  public SetCustomerID(cid: number) {
    this.CustomerID = cid;
  }

  // public GetTotalAmounts(): number {
  //   //this._cartItems = this.productService._cartItems;
  //   localStorage.setItem('item', JSON.stringify(this._cartItems));
  //   if (this._cartItems != null) {
  //     this._totalItem = this._cartItems.length;
  //     this.totalAmounts = 0;
  //     this._cartItems.forEach((item) => {
  //       this.totalAmounts += (item.Qty * item.UnitPrice);
  //     });      
  //   };
  //   localStorage.setItem('item', null)
  //   return this.totalAmounts;
  // }

  ////////////// Here New Concept  ///////////////

  getCartItems(product) {
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null && Object.keys(hasitemdata).length !== 0) {
      hasitemdata.push(product);
      return hasitemdata;
    }
  }
  getProduct(_product: Ecom_Product) {
    return this._http.get(environment.baseurl + 'getproductall');
  };
  setProduct(_product: Ecom_Product) {
    return this._http.post<any>(environment.baseurl + 'createProduct', _product);
  };
  deleteProduct(pid: any) {
    return this._http.get(environment.baseurl + 'deleteProduct?pid=' + pid)
  };
};
