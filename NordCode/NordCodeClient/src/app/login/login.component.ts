import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { LoginService } from '../login/login.service';
import { User } from './User';

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
export class LoginComponent {
  constructor(private _loginservice: LoginService) { }
  emailFormControl = new FormControl(
    '', [ Validators.required, Validators.email, ]
    );

  matcher = new MyErrorStateMatcher();
  userModel = new User('','','', '', '', '', '', new Date, '');
  submitted = false;
  errorMsg = false;
  id = 0;

  onSubmit(event) {

    this._loginservice.createUser(this.userModel).subscribe(data => this.id = data.id, error => this.errorMsg = error.statusText)
    this.errorMsg = true;
    //console.log(this.id)
    this.userModel = new User('','','', '', '', '', '', new Date, '');
  }
}

