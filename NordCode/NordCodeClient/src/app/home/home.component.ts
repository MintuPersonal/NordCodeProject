import { Component, OnInit } from '@angular/core';
import { Task } from '../addnew/task';
import { AddnewService } from '../addnew/addnew.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMsg: any;
  id: any;

  constructor(private _addnewService: AddnewService) { }

  pictures = [
    { 'date': new Date, 'title': 'Mr Rahman', 'time': '10-12 pm', 'location': 'Bangladesh', 'IsDone': true, 'IsDelete': true },
    { 'date': new Date('29 nov 2019'), 'title': 'Mr Rahman', 'time': '10-12 pm', 'location': 'Bangladesh', 'IsDone': false, 'IsDelete': false }
  ]

  selected = 'option2';
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  taskModel = new Task('', '', '', new Date(''), this.exportTime, this.exportTime, '', 50, '', '', false, false, new Date(), '');
  //'', '', new Date(''), this.exportTime, this.exportTime, '', 50, '', '', false, false);
  tasksModel: Task[];
  title = 'demo';

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
    // this.ps.getProducts().subscribe((data: Product[]) => {this.products = data; });
    this._addnewService.getTask(this.taskModel).subscribe((data: Task[]) => { this.tasksModel = data; });
  }

  onSubmit(event) {

    this._addnewService.createTask(this.taskModel).subscribe(data => this.id = data.id, error => this.errorMsg = error.statusText)
  }

  onClear() {
    console.log('all clear')

    //this.taskModel = { task_id: '', title: '', description: '', date: new Date("dd M yy"), time_from: '', time_to: '', location: '', notify: '', email: '', priority: 0, isDelete: false, isDone: false };

  }
}
