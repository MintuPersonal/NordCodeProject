import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectRoleService {
  _serverURL: string;
  constructor(private _http: HttpClient) { }
  getMenuDetails(roleName: string) {
    return this._http.get(environment.baseurl + 'getmenus');
  }
}
