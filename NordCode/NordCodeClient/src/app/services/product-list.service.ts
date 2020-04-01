import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
      
  _baseUrl = "http://localhost:3000/api/";
  _url = '';

  constructor(private _http: HttpClient, private navbarService: NavbarService) { }

  getCommercial() {
    this._url = this._baseUrl+'gethomes';    
    return this._http.get(this._url);
  }

  getAddtoCart() {
    this._url = this._baseUrl+'getaddtocart';    
    return this._http.get(this._url);
  }


  AddtoItems(itemObj: any) {
    this.navbarService.getTotalItemAmount();
  }
}
