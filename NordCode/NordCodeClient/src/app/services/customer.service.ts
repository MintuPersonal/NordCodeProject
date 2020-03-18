import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private _http: HttpClient) { }

  _baseUrl = "http://localhost:3000/api/";
  _url = '';  

  setOrder(order) {
    this._url = this._baseUrl+'setorder';    
    debugger;
    return this._http.post<any>(this._url, order);
  }

  getCommercial() {
    this._url = this._baseUrl+'gethomes';    
    return this._http.get(this._url);
  }

  getAddtoCart() {
    this._url = this._baseUrl+'getaddtocart';    
    return this._http.get(this._url);
  }
}
