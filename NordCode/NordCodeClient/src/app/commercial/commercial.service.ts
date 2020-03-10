import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ecom_Commercial } from './Commercial';

@Injectable({
  providedIn: 'root'
})

export class CommercialService {
  
  _baseUrl = "http://localhost:3000/";
  _url = '';

  constructor(private _http: HttpClient) { }

  getCommercial(_commercial: Ecom_Commercial) {
    this._url = this._baseUrl+'api/gethomes';    
    return this._http.get(this._url);
  }

  getAddtoCart(commercialModel: Ecom_Commercial) {
    this._url = this._baseUrl+'api/getaddtocart';    
    return this._http.get(this._url);
  }
}
