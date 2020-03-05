import { Injectable } from '@angular/core';
import { Ecom_Product } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private _http: HttpClient) { }

  _baseUrl = "http://localhost:3000/";
  _url = '';

  getProduct(_product: Ecom_Product) {
    this._url = this._baseUrl + 'api/getproductall';
    return this._http.get(this._url);
  };

  setProduct(_product: Ecom_Product) {
    this._url = this._baseUrl + 'api/createProduct';
    return this._http.post<any>(this._url, _product)
  };

};
