import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { AddnewService } from '../../../services/addnew.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  errorMsg: any;
  id: any;

  constructor(private _addnewService: AddnewService) { }

  selected = 'option2';
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  taskModel = new Task('', '', '', new Date(), this.exportTime, this.exportTime, '', 50, '', '', false, false, new Date(), '');

  tasksModel: Task[];
  Title = 'demo';
  hide: boolean;

  onChangeHour(event) {
    this.taskModel.time_from = event;
    console.log('event', event);
  }
  onChangeHourTo(event) {
    this.taskModel.time_to = event;
    console.log('event', event);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  ngOnInit() {
    this._addnewService.getTask(this.taskModel).subscribe((data: Task[]) => { this.tasksModel = data; });
    //debugger;
  }

  onSubmit(event) {
    
    this.taskModel.task_id = '11'
    this.taskModel.create_at = new Date()
    this.taskModel.user_Information_user_id = '11'
    this.taskModel.time_from = new Date()
    this.taskModel.time_to = new Date()

    this._addnewService.createTask(this.taskModel).subscribe(data => this.id = data.id, error => this.errorMsg = error.statusText)
    this.onClear();
  }

  onClear() {
    //console.log('all clear')
    this.taskModel = {task_id: '', title: '', description: '', date: new Date(), time_from: '', time_to: '', location: '', notify: '', email: '', priority: 0, isDelete: false, isDone: false, create_at: new Date(), user_Information_user_id: '' }
  }
}
