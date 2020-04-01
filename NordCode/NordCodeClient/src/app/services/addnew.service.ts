import { Injectable } from '@angular/core';
import { Task } from '../components/admin/addnew/task';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AddnewService {
  constructor(private _http: HttpClient) { }
  getTask(_taskModel: Task) {
    return this._http.get(environment.baseurl + "gettask");
  };
  createTask(_task: Task) {
    return this._http.post<any>(environment.baseurl + "createtask", _task);
  };
};
