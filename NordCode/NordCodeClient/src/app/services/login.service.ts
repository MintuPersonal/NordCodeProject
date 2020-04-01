import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }
  // SetLoginUserInfo(phoneNumber: any) {
  //   localStorage.setItem('user', null);
  //   localStorage.setItem('user', phoneNumber);
  // }
  getUser(user: User) {
    return this._http.get(environment.baseurl + "getuser?Username=" + user.Username + "&Password=" + user.Password); //, {params});
  }
  updateUser(user: User) {
    return this._http.post<any>(environment.baseurl + 'createuser', user)
  }
}
