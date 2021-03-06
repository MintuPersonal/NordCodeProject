import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-businesspolicy',
  templateUrl: './businesspolicy.component.html',
  styleUrls: ['./businesspolicy.component.css']
})
export class BusinesspolicyComponent implements OnInit {
 // disabled: boolean;
  Birthday: FormControl;

  constructor(private productService: ProductService, private customerService: CustomerService) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  // =============== Contact Us =================

  customerModel = new Customer();
  // public imagePath;
  // public imgURL: any;
  // public message: string;

  // preview(files) {
  //   debugger;
  //   if (files.length === 0)
  //     return;

  //   this.customerModel.FileUrl = files[0].name;
  //   this.customerModel.FileExtension = files[0].type;
  //   this.customerModel.FileImage = files[0].size;
  //   this.customerModel.TrackedId = window.location.hostname

  //   if (this.customerModel.FileExtension.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }
  //   this.message = "";

  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }

  //   console.log(files)
  // }
  public EndDateChange(event): void {
    this.customerModel.Birthday = event.value;
  }

  ngOnInit() {
    // this.customerModel.CID = this.productService.GetCustomerID();
    // this.customerModel.MobileNo = '0' + this.customerModel.CID;
    // this.customerService.getcustomerinfo(this.customerModel.MobileNo).subscribe((userData: any) => {
    //   this.customerModel = userData.customer[0];
    //   this.customerModel.FileUrl += this.customerModel.FileImage;
    //   if (userData.customer.length) {
    //     this.disabled = true;
    //     this.Birthday = new FormControl(this.customerModel.Birthday);
    //   } else {
    //     this.disabled = false;
    //   }
    // });
  }

  //// Save Method ///

  // submitted = false;
  // errorMsg = '';
  // id = 0;

  onSubmit() {

    this.customerModel;
    this.customerModel.TONumber = '11_' + Math.random().toString().slice(2, 11);
    this.customerModel.TrackedId = environment.baseurl;
    this.customerModel.CreateBy = this.productService.GetCustomerID().toString();
    this.customerModel.CreateDate = new Date;
    this.customerModel.Delete = false;
    this.customerModel.Active = true;
    var data = this.customerService.updateCustomer(this.customerModel); //.subscribe((data: any)=>{    });    
    this.customerModel = new Customer();
  };
  onClear() {
    this.customerModel = new Customer();
  }

  // ================================

}
