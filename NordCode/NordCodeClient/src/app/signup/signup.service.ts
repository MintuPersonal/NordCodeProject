import { Injectable } from '@angular/core';
import { User } from '../login/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _http: HttpClient) { }

  _url = "http://localhost:3000/api/signup";
  singup(user: User) {
    //user.TrackedId = this._http.get("http://api.ipify.org/?format=json").toPromise;
    return this._http.post<any>(this._url, user);
  }
}
