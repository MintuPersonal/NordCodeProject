import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AddnewService {

  _url = 'http://localhost:3000/api/createtask';
  constructor(private _http: HttpClient) { }
  createTask(_task: Task) {
    return this._http.post<any>(this._url, _task)
  }
}
