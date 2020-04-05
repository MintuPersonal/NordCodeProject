import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ecom_Orders } from '../models/order';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private _http: HttpClient, private router: Router, private productService : ProductService) { }
  getOrder(OrderNo) {
    return this._http.get(environment.baseurl + 'getorder?OrderNo=' + OrderNo);
  }
  setOrder(order: Ecom_Orders) {      
    order.cartItems = this.productService._cartItems;
    debugger;  
    return this._http.post<any>(environment.baseurl + 'createorder', order).subscribe((data: any) => {
      if (data.status) {
        debugger;
        this.router.navigate(['./payment', order.OrderNo, order.TotalPrice]);
      }
      else {
        //this.router.navigate(['./checkout: price']);
      }
    });
  };
  getCommercial() {
    return this._http.get(environment.baseurl + 'gethomes');
  }
  getAddtoCart() {
    return this._http.get(environment.baseurl + 'getaddtocart');
  }
};
