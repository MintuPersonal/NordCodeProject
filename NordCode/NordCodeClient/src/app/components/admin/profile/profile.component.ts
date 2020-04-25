import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedService } from 'src/app/services/shared.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  disabled: boolean;
  Birthday = new FormControl();

  constructor(private productService: ProductService, private customerService: CustomerService, private sharedService: SharedService) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  @ViewChild('file', { static: false }) file: ElementRef;
  customerModel = new Customer();
  public imagePath;
  public imgURL: any;
  public message: string;

  preview(files) {

    if (files.length === 0)
      return;

    this.customerModel.FileUrl = files[0].name;
    this.customerModel.FileExtension = files[0].type;
    //this.customerModel.FileImage = files[0].size;
    this.customerModel.TrackedId = window.location.hostname

    if (this.customerModel.FileExtension.match(/image\/*/) == null) {
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

    this.customerModel.Birthday = event.value;

    console.log(this.customerModel.Birthday)
  }

  ngOnInit() {
    this.customerModel.CID = this.productService.GetCustomerID();
    this.customerModel.MobileNo = '0' + this.customerModel.CID;
    this.customerService.getcustomerinfo(this.customerModel.MobileNo).subscribe((userData: any) => {
      this.customerModel = userData.customer[0];
      this.imgURL = '../assets/img/member/' + this.customerModel.FileUrl;
      if (userData.customer.length) {
        this.disabled = true;
        this.Birthday = new FormControl(this.customerModel.Birthday);
      } else {
        this.disabled = false;
      }
    });
  }

  submitted = false;
  errorMsg = '';
  id = 0;

  onSubmit() {

    this.customerModel;
    this.customerModel.TONumber = '11_' + Math.random().toString().slice(2, 11);
    this.customerModel.TrackedId = environment.baseurl;
    this.customerModel.UpdateBy = this.productService.GetCustomerID().toString();
    this.customerModel.UpdateDate = new Date;
    this.customerModel.Delete = false;
    this.customerModel.Active = true;
    this.customerService.updateCustomer(this.customerModel).subscribe((data: any) => {
      if (data.status) {
        console.log(data.customer[0].MobileNo);
      }
    });
    this.customerModel = new Customer();
  };
  onClear() {
    this.customerModel = new Customer();
  }
  onFileRemove() {
    this.customerModel.FileUrl = 'Mahatab.png';
    this.imgURL = '../assets/img/member/Mahatab.png';
    //this.onFileChange();
  }
  onFileChange() {

    this.onSubmit();
    const file = this.file.nativeElement.files[0];
    const fileToUpload = new FormData();
    fileToUpload.set('file', file);

    // file.inProgress = true;
    // file.progress = 50;
    this.sharedService.upload(fileToUpload).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            // file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        //  file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
    // this.sharedService.upload(fileToUpload).subscribe((data: any) => {      
    //   if (data.status) {

    //   }
    // });

  }
}
