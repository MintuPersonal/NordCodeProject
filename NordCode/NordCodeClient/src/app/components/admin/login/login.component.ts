import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/Customer';
import { ProductService } from 'src/app/services/product.service';
import { InteractionService } from 'src/app/services/interaction.service';

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
  customerModel: Customer;
  TotalPrice: number;

  ngOnInit(): void {
    let isCounted = JSON.parse(localStorage.getItem('IsCounted'))
    this.isCounted = isCounted;
  }
  constructor(private interactionService: InteractionService, public router: Router, private productService: ProductService, private customerService: CustomerService) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  userModel = new User();
  userModels: User[];
  submitted = false;
  errorMsg = false;
  isCounted = 1;
  id = 0;

  onSubmit(customer: Customer) {
    this.isCounted += 1;
    this.userModel.IsCounted = this.isCounted;
    this.customerService.getCustomer(this.userModel.Mobileno).subscribe((data: any) => {
      if (data.status) {
        this.customerModel = data.customer[0]
        this.interactionService.sendForLoginUpdate(this.customerModel);
        if (this.productService.logincondition == 1) {
          this.productService.logincondition = 2          
          this.TotalPrice = this.productService.TotalPrice          
          this.productService.SetCustomerID(this.customerModel.CID);         
          localStorage.setItem('currentUser', this.customerModel.CID.toString());
          localStorage.setItem('customerInfo', JSON.stringify(this.customerModel));
          this.productService.SetEmptyCart();
          this.router.navigate(['/checkout', this.TotalPrice]);
        } else {
          debugger;
          this.router.navigate(['/']);
        }
      }
      else {
        this.productService.SetCustomerID(0);
        localStorage.setItem('customerInfo', '');
        localStorage.setItem('currentUser', '');
      }
    });

    // onSubmit(event) {
    //   this.isCounted += 1;
    //   this.userModel.IsCounted = this.isCounted;
    //   localStorage.setItem('IsCounted', JSON.stringify(this.isCounted));
    //   this._loginService.getUser(this.userModel).subscribe((data: User) => {
    //     //this.userModels = data;  
    //     if (this.userModel.Username == data.Username) {
    //       localStorage.setItem('user', this.userModel.Username.toString());
    //     }
    //     else {
    //       localStorage.setItem('user', '');
    //     }

    //   });
    // if (this.userModels) {
    //   this.router.navigate(['/login']);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }
}

