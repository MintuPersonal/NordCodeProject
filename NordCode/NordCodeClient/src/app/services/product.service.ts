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

  MobileNo: string = '';
  CustomerID: number = 0;
  Address: string = 'Address';
  Area: string = 'Area'
  logincondition: number = 0;
  customer: Customer;
  productDetails = [];

  TotalPrice: number = 0;
  TotalNetPrice: number = 0;
  OtherDiscount: number = 0;
  wishList: Cart[];

  constructor(private _http: HttpClient) {
    var data = localStorage.getItem("item");
    if (data == 'undefined' || data == "null") {
      this._cartItems = []
    } else {
      this._cartItems = JSON.parse(localStorage.getItem('item' || "null"));
    }
    this.GetCustomerID();
    this.wishList = [];
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
    this.TotalNetPrice = 0;
    this.OtherDiscount = 0;

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
      orderdetail.NetPrice = item.MRP;
      orderdetail.HostAddress = environment.baseurl;
      orderdetail.ImgPath = item.ImgPath;

      orderdetail.TrackedId = environment.baseurl;
      orderdetail.CreateBy = this.customer.CID.toString();
      orderdetail.CreateDate = new Date();
      orderdetail.UpdateBy = '';
      orderdetail.UpdateDate = new Date();
      orderdetail.Delete = false;
      orderdetail.Active = true;
      OrderDetails.push(orderdetail);
      this.TotalPrice = this.TotalPrice + (item.UnitPrice * item.Qty);
      this.TotalNetPrice = this.TotalNetPrice + (item.MRP * item.Qty);
    });

    order.OID = 0;
    order.TONumber = this.TONumber;
    order.CustomerId = this.customer.CID;
    order.PaymentId = 0;
    order.CouponId = 3333;
    order.PaymentModeId = 1;
    order.Discount = ((this.TotalNetPrice - this.TotalPrice) + this.OtherDiscount);
    order.Reason = '';
    order.Active = true;

    order.TotalItemQty = this._cartItems.length;
    order.DeliveryCharge = 20;
    order.TotalPrice = this.TotalPrice;
    order.NetPrice = this.TotalNetPrice;
    order.Address = this.customer.Address;
    order.Area = this.customer.Area;
    order.DeliveryTime = new Date();
    order.OrderStatus = 1;

    order.TrackedId = environment.baseurl;
    order.CreateBy = this.customer.CID;
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
  public addProductToCart(product: Cart) {

    let productExits = false;    
    for (let key in this._cartItems) {
      if (this._cartItems[key].PID === product.PID) {
        this._cartItems[key].Qty++;
        productExits = true;
        break;
      }
    }
    if (!productExits) {
      let cart = new Cart();
      cart.Add= '+';
      cart.PID= product.PID;
      cart.ImgPath= product.ImgPath;
      cart.PName= product.PName;
      cart.Qty= 1;
      cart.MRP= product.MRP;
      cart.UnitPrice= product.UnitPrice;
      cart.Close= 'X';    
      this._cartItems.push(cart);
    }    
  }

  ////////////// Here New Concept  ///////////////

  public getCartItems(product) {
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null && Object.keys(hasitemdata).length !== 0) {
      hasitemdata.push(product);
      return hasitemdata;
    }
  }
  public getProduct(_product: Ecom_Product) {
    return this._http.get(environment.baseurl + 'getproductall');
  };
  public setProduct(_product: Ecom_Product) {
    return this._http.post<any>(environment.baseurl + 'createProduct', _product);
  };
  public deleteProduct(pid: any) {
    return this._http.get(environment.baseurl + 'deleteProduct?pid=' + pid)
  };
  public getProductDetails(pid: number) {
    return this._http.get(environment.baseurl + 'getproductdetail?PID=' + pid);
  }
  public SetWishList(item: Cart) {   
    if (this.wishList.length) {
      var wishList = this.wishList.filter(itemobj => { if (itemobj.PID == item.PID) { return itemobj; } });   
      if (wishList.length) {
      } else {
        this.wishList.push(item);
      }
    } else {
      this.wishList.push(item);
    }
  } 
};
