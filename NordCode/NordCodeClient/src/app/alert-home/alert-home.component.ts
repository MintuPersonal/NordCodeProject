// import { Component, OnInit } from '@angular/core';
// import { AlertService } from '../_alert/alert.service';

// @Component({
//   selector: 'app-alert-home',
//   templateUrl: './alert-home.component.html',
//   styleUrls: ['./alert-home.component.css']
// })
import { Component } from '@angular/core';
import { AlertService } from '../_alert';

@Component({ templateUrl: 'alert-home.component.html' })
export class AlertHomeComponent {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

constructor(protected alertService: AlertService) { }

  ngOnInit(): void {
  }

}
