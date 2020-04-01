import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  constructor(private _http: HttpClient, private router: Router) { }
  singUp(user: User) {
    return this._http.post<any>(environment.baseurl + 'createuser', user).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate['/login'];
      } else {
        this.router.navigate['/signup'];
      }
    });
  }
}
