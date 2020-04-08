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
  
  getOrderDetails(OrderNo: string) {
    return this._http.get(environment.baseurl + 'getorderdetails?orderno=' + OrderNo);
  }
  getCustomer(cmobileno) {
    return this._http.get(environment.baseurl + 'getcustomer?cmobileno=' + cmobileno);
  }  
  
  getOrders(customerid) {
    return this._http.get(environment.baseurl + 'getorders?customerid=' + customerid);
  }  

  getOrder(OrderNo) {
    return this._http.get(environment.baseurl + 'getorder?orderNo=' + OrderNo);
  }  

  setOrder(order: Ecom_Orders) {
    return this._http.post<any>(environment.baseurl + 'setorder', order)
    //.subscribe((order: any) => {
      // if (order.status) {        
      //   this.router.navigate(['/payment', order.Number, order.TotalPrice]);
      // }
      // else {
      //   this.router.navigate(['/checkout', order.TotalPrice]);
      // }
    //});
  };
  // createTask(_task: Task) {
  //   return this._http.post<any>(environment.baseurl + "createtask", _task);
  // };
 

  updateOrder(order: Ecom_Orders) {
    return this._http.post<any>(environment.baseurl + 'updateorder', order).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['/payment', order.TONumber, order.TotalPrice]);
      }
      else {
        this.router.navigate(['/checkout', order.TotalPrice]);
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
