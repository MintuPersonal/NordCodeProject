import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectRoleService {
  _serverURL: string;
  constructor(private _http: HttpClient) {
    this._serverURL = "http://localhost:8080/api.services";
  }

  _baseUrl = "http://localhost:3000/api/";
  _url = '';

  getMenuDetails(roleName: string) {
    //let _url = this._serverURL + "/Menu/GetMenuDetails?roleName=" + roleName;  
  
    this._url = this._baseUrl + 'getmenus';
    return this._http.get(this._url);
  }


  // getMenuDetails(roleName: string) {
  //   let _url = this._serverURL + "/Menu/GetMenuDetails?roleName=" + roleName;

  //   return new Promise((resolve, reject) => {
  //     this._http.get(_url).map(res => res.json())
  //       .catch((error: any) => {
  //         console.error(error);
  //         reject(error);
  //         return Observable.throw(error.json().error || 'Server error');
  //       }).subscribe((data) => {
  //         resolve(data);
  //       });
  //   });
  // }
}
