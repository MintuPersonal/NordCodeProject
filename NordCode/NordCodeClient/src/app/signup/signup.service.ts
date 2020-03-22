import { Injectable } from '@angular/core';
import { User } from '../login/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  _baseUrl = "http://localhost:3000/api/";
  _url = '';
  constructor(private _http: HttpClient, private router: Router) { }

  singUp(user: User) {
    this._url = this._baseUrl + 'createuser';
    return this._http.post<any>(this._url, user).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate['/login'];
      } else {
        this.router.navigate['/signup'];
      }
    });

    //user.TrackedId = this._http.get("http://api.ipify.org/?format=json").toPromise;
    //return this._http.post<any>(this._url, user);
  }
}
