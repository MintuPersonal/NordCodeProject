import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AddnewService {
  _baseUrl = "http://localhost:3000/";
  _url = '';  //_url = 'http://localhost:3000/api/createtask';
  constructor(private _http: HttpClient) { }
  
  getTask(_taskModel: Task) {
    this._url = this._baseUrl + "api/gettask";
    debugger;
    return this._http.get(this._url);
  };
  createTask(_task: Task) {    
    this._url = this._baseUrl + "api/createtask";  
    debugger;  
    return this._http.post<any>(this._url, _task);
  };
};
