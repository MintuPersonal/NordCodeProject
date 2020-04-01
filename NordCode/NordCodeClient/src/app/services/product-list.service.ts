import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  constructor(private _http: HttpClient, private navbarService: NavbarService) { }
  getCommercial() {
    return this._http.get(environment.baseurl + 'gethomes');
  }
  getAddtoCart() {
    return this._http.get(environment.baseurl + 'getaddtocart');
  }
}
