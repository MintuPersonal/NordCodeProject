import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { ProductService } from 'src/app/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {

  featureItem: any[];


  Birthday: FormControl;

  constructor(private productService: ProductService, private customerService: CustomerService) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  ngOnInit(): void {
    this.featureItem = [];
    this.featureItem.push('Contact Us');
  }
  customerModel = new Customer();

  public EndDateChange(event): void {
    this.customerModel.Birthday = event.value;
  }


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

}
