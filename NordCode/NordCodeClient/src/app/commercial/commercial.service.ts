import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ecom_Commercial } from './Commercial';

@Injectable({
  providedIn: 'root'
})

export class CommercialService {
  
  _baseUrl = "http://localhost:3000/api/";
  _url = '';

  constructor(private _http: HttpClient) { }

  getCommercial() {
    this._url = this._baseUrl+'gethomes';    
    return this._http.get(this._url);
  }

  getAddtoCart() {
    this._url = this._baseUrl+'getaddtocart';    
    return this._http.get(this._url);
  }
}
