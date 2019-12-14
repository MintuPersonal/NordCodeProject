import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { User } from './User';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _httpparams = new HttpParams();


  _baseUrl = "http://localhost:3000/";
  _url = '';

  constructor(private _http: HttpClient) { }

  getUser(user: User) {

    this._url = this._baseUrl + "api/getuser";
    const  params = new  HttpParams().set('user', user.UserName).set('pass', user.PassWord);
    return this._http.get(this._url, {params});
  }

  updateUser(user: User) {
    this._url = this._baseUrl + "api/createuser";
    return this._http.post<any>(this._url, user)
  }
}
