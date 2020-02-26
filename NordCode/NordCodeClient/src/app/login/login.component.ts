import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { LoginService } from '../login/login.service';
import { User } from './User';
import { Router } from '@angular/router';
import { SignupService } from '../signup/signup.service';

/** Error when invalid control is dirty, touched, or submitted. */
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
  constructor(private _loginservice: LoginService, private _signupservice: SignupService, public router: Router) { }
  emailFormControl = new FormControl(
    '', [Validators.required, Validators.email,]
  );

  matcher = new MyErrorStateMatcher();
  userModel = new User('', '', '', '', '', '', '', new Date, '', 0);
  usersModel: User[];
  submitted = false;
  errorMsg = false;
  isCounted = 1;
  id = 0;

  onSubmit(event) {
    this.isCounted += 1;
    this.userModel.IsCounted = this.isCounted;
    localStorage.setItem('IsCounted', JSON.stringify(this.isCounted));
    this._loginservice.getUser(this.userModel).subscribe((data: User[]) => { this.usersModel = data; });
    
    // this.usersModel.forEach(element => {
    //   if (element.UserName === this.userModel.UserName && element.PassWord === this.userModel.PassWord) {
    //     this.router.navigate(['home']);
    //   }

    // });  

    console.log(this.isCounted)
    this.userModel = new User('', '', '', '', '', '', '', new Date, '', 0);
    this.router.navigate(['home']);
  }
}

