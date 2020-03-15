import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
    
  _baseUrl = "http://localhost:3000/";
  _url = '';

  constructor(private _http: HttpClient) { }

  getCommercial() {
    this._url = this._baseUrl+'api/gethomes';    
    return this._http.get(this._url);
  }

  getAddtoCart() {
    this._url = this._baseUrl+'api/getaddtocart';    
    return this._http.get(this._url);
  }
}
