import { Injectable } from '@angular/core';
import { Ecom_Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  ////////////// Here New Concept  ///////////////
  cartItems = [];  
  fromproductlist: boolean = false;
  constructor(private _http: HttpClient) { }
  
  public RemoveProductFromCart(product, fromproductlist) {
 this.fromproductlist = fromproductlist;
    let productExits = false;
    for (let key in this.cartItems) {
      if (this.cartItems[key].PID === product.PID && this.cartItems[key].Qty > 1) {
        this.cartItems[key].Qty--;
        productExits = true;
        break;
      }
    }

    // this.totalItems = this.cartItems.length;
    // this.totalAmounts = 0
    // this.cartItems.forEach((item) => {
    //   this.totalAmounts += (item.Qty * item.UnitPrice);
    // });
  }
  public RemoveFromCart(index: number) {
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      //this.totalItems = this.cartItems.length;
      // this.totalAmounts = 0
      // this.cartItems.forEach((item) => { this.totalAmounts += (item.Qty * item.UnitPrice); });
    }
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
    return this._http.get(environment.baseurl+'getproductall');
  };
  setProduct(_product: Ecom_Product) {
    return this._http.post<any>(environment.baseurl+'createProduct', _product);
  };
  deleteProduct(pid: any) {
    return this._http.get(environment.baseurl+'deleteProduct?pid=' + pid)
  };
};
