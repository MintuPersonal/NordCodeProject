import { Component, OnInit } from '@angular/core';

import { SignupService } from '../../../services/signup.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})
export class SignupComponent implements OnInit {

  constructor(private _singUpService: SignupService) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
  userModel = new User();
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    this.userModel.FileUrl = files[0].name;
    this.userModel.FileExtension = files[0].type;
    this.userModel.FileImage = files[0].size;
    this.userModel.TrackedId = window.location.hostname

    if (this.userModel.FileExtension.match(/image\/*/) == null) {
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

    console.log(files)
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

  onSubmit() {
    this.userModel;
    this.userModel.UID = '1';    
    this.userModel.TrackedId = '127';
    this.userModel.CreateBy = '11';
    this.userModel.CreateDate = new Date;
    this.userModel.Delete = false;
    this.userModel.Active = true;

    var data = this._singUpService.singUp(this.userModel); //.subscribe((data: any)=>{    });
    debugger; 
    this.userModel = new User();      
    
  };
  onClear() {
    this.userModel = new User();
  }

}
