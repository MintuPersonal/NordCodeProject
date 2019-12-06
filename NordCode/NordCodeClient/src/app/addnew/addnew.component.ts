import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { AddnewService } from './addnew.service';

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
  taskModel = new Task('', '', new Date(), this.exportTime, this.exportTime, '', 50, '', '', false, false);
  title = 'demo';

  onChangeHour(event) {
    this.taskModel.From = event;
    console.log('event', event);
  }
  onChangeHourTo(event) {
    this.taskModel.To = event;
    console.log('event', event);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  ngOnInit() {  

  }

  onSubmit(event) {

    this._addnewService.createTask(this.taskModel).subscribe(data => this.id = data.id, error => this.errorMsg = error.statusText)
    this.onClear();
  }

  onClear() {
    //console.log('all clear')
    this.taskModel = { Title: '', Description: '', Date: new Date(), From: '', To: '', Location: '', Notify: '', Email: '', Priority: 0, IsDelete: false, IsDone: false }

  }
}
