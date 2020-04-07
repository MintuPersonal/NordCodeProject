import { Injectable } from '@angular/core';
import { Ecom_Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  ////////////// Here New Concept  ///////////////
  //_cartItems = [];
  fromproductlist: boolean = false;
  _cartItems: Cart[];
  _customerPonne: string;
  constructor(private _http: HttpClient) {
    
    //this._cartItems = JSON.parse(localStorage.getItem('item'));
    var data = localStorage.getItem("item");
    if (data == 'undefined' || data == "null") {
      this._cartItems = []
    } else {
      this._cartItems = JSON.parse(localStorage.getItem('item'|| "null"));
    }    
  }
  SetEmptyCart(): Cart[] {
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
  getCartItemsFromLocal() {
    return JSON.parse(localStorage.getItem('item'));
  }
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
