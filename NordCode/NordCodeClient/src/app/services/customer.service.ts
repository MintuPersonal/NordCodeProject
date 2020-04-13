import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ecom_Orders } from '../models/Order';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 

  constructor(private _http: HttpClient, private router: Router, private productService: ProductService) { }

  getCustomer(cmobileno) {
    return this._http.get(environment.baseurl + 'getcustomer?cmobileno=' + cmobileno);
  }    
   
  getOrders(customerid) {
    return this._http.get(environment.baseurl + 'getorders?customerid=' + customerid);
  }

  getOrder(OrderNo) {
    return this._http.get(environment.baseurl + 'getorder?orderNo=' + OrderNo);
  }
  
  getOrderDetails(TOnumber: string) {
    return this._http.get(environment.baseurl + 'getorderdetails?TONumber=' + TOnumber);
  }

  public SetOrder(order: Ecom_Orders) {
    return this._http.post<any>(environment.baseurl + 'setorder', order);
  };


  updateOrder(order: Ecom_Orders) {
    return this._http.post<any>(environment.baseurl + 'updateorder', order);
  };

  getCommercial() {
    return this._http.get(environment.baseurl + 'gethomes');
  }
  getAddtoCart() {
    return this._http.get(environment.baseurl + 'getaddtocart');
  }
};
