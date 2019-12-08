import { Component, OnInit } from '@angular/core';

import { User } from '../login/User';
import { SignupService } from './signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})
export class SignupComponent implements OnInit {

  constructor(private _singupService: SignupService) { }

  userModel = new User('', '', '', '', '', '', '', new Date, '');
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    this.userModel.FileUrl = files[0].name;
    this.userModel.FileExtention = files[0].type;
    this.userModel.FileImage = files[0].size;
    this.userModel.TrackedId = window.location.hostname

    if (this.userModel.FileExtention.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.message = "";

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  public EndDateChange(event): void {
    this.userModel.Birthday = event.value;

    console.log(this.userModel.Birthday)
  }

  ngOnInit() {

  }

  //// Save Method ///

  submitted = false;
  errorMsg = '';
  id = 0;

  onSubmit(userModel) {

    console.log('UI Returm Id :' + this.userModel.FileUrl);
    debugger;
    this._singupService.singup(this.userModel).subscribe(data => this.id = data.id, error => this.errorMsg = error.statusText);
    //console.log('Returm Id :' + this.id);
    this.userModel = { FullName: '', UserName: '', PassWord: '', ConfirmPassWord: '', FileUrl: '', FileExtention: '', FileImage: '', Birthday: new Date, TrackedId: '' };
  }

  /// End of Save Method ///

  onClear() {

    this.userModel = new User('', '', '', '', '', '', '', new Date, '');

  }

}
