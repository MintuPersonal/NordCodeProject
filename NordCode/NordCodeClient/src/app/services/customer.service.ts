import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ecom_Orders } from '../components/admin/order/order';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private _http: HttpClient, private router: Router) { }

  _baseUrl = "http://localhost:3000/api/";
  _url = '';

  getOrder(OrderNo) {
    this._url = this._baseUrl + 'getorder?OrderNo=' + OrderNo;
    return this._http.get(this._url);
  }

  setOrder(order: Ecom_Orders) {
    this._url = this._baseUrl + 'createorder';
    return this._http.post<any>(this._url, order).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['./payment', order.OrderNo, order.UnitPrice]);
      }
      else {
        //this.router.navigate(['./checkout: price']);
      }
    });
  };

  getCommercial() {
    this._url = this._baseUrl + 'gethomes';
    return this._http.get(this._url);
  }

  getAddtoCart() {
    this._url = this._baseUrl + 'getaddtocart';
    return this._http.get(this._url);
  }
};
