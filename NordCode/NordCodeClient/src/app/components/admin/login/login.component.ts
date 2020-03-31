import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    let isCounted = JSON.parse(localStorage.getItem('IsCounted'))
    this.isCounted = isCounted;
  }
  constructor(private _loginService: LoginService, public router: Router) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  userModel = new User();
  userModels: User[];
  submitted = false;
  errorMsg = false;
  isCounted = 1;
  id = 0;

  onSubmit(event) {
    this.isCounted += 1;
    this.userModel.IsCounted = this.isCounted;
    localStorage.setItem('IsCounted', JSON.stringify(this.isCounted));
    this._loginService.getUser(this.userModel).subscribe((data: User) => {
      //this.userModels = data;  
      if (this.userModel.Username == data.Username) {
        localStorage.setItem('user', this.userModel.Username.toString());
      }
      else {
        localStorage.setItem('user', '');
      }

    });
    // if (this.userModels) {
    //   this.router.navigate(['/login']);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }
}

