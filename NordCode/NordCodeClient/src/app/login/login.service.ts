import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = 'http://localhost:3000/api/createuser';
  constructor(private _http: HttpClient) { }

  createUser(user: User) {
    return this._http.post<any>(this._url, user)
  }
}
