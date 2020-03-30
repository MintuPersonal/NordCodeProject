import { Injectable } from '@angular/core';
import { Task } from '../components/admin/addnew/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AddnewService {
  _baseUrl = "http://localhost:3000/api/";
  _url = '';  
  //_url = 'http://localhost:3000/api/createtask';
  constructor(private _http: HttpClient) { }
  
  getTask(_taskModel: Task) {
    this._url = this._baseUrl + "gettask";
    //debugger;
    return this._http.get(this._url);
  };
  createTask(_task: Task) {    
    this._url = this._baseUrl + "createtask";  
    //debugger;  
    return this._http.post<any>(this._url, _task);
  };
};
