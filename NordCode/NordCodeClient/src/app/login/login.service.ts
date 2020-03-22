import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { User } from './User';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _httpparams = new HttpParams();
  _baseUrl = "http://localhost:3000/api/";
  _url = '';

  constructor(private _http: HttpClient) { }
  getUser(user: User) {
    this._url = this._baseUrl + "getuser?Username" + user.Username + "&Password" + user.Password;
    //const  params = new  HttpParams().set('user', user.Username).set('pass', user.Password);
    return this._http.get(this._url);//, {params});
  }

  updateUser(user: User) {
    this._url = this._baseUrl + "createuser";
    return this._http.post<any>(this._url, user)
  }
}
