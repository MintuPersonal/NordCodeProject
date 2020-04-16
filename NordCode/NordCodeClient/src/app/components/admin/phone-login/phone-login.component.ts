import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../../services/window.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/Customer';
import { combineAll } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

export class PhoneNumber {
  country: string;
  line: string;
  get e164() {
    return `+880${this.line}`;
  }
}


@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  loggged: boolean;
  cid: number;
  constructor(private win: WindowService, private router: Router, private customerService: CustomerService,
    private productService: ProductService ) { }

  ngOnInit() {
    //this.loginStatus();
    // if (!this.loginStatus()) {
    //   this.router.navigate(['/']);
    // }
    var firebaseConfig = {
      apiKey: "AIzaSyAABTcunn62aKYHkJGkfnr5JhXA-D9Ztak",
      authDomain: "otp-ecommerce.firebaseapp.com",
      databaseURL: "https://otp-ecommerce.firebaseio.com",
      projectId: "otp-ecommerce",
      storageBucket: "otp-ecommerce.appspot.com",
      messagingSenderId: "932041012966",
      appId: "1:932041012966:web:9936106c9ea4e508e42d27"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    //firebase.initializeApp(firebaseConfig);
    //alert(window.location.host)
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: function (response) {
        this.sendLoginCode()
        //submitPhoneNumberAuth();
      }
    })
    //new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()

  }

  sendLoginCode() {    
    this.cid = this.getCustomerCID();
    this.productService.SetCustomerID(this.cid);
    debugger;
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;
      }).catch(error => console.log(error));
  }

  private getCustomerCID(): number {
    var cMobileNo = this.phoneNumber.e164;
    var cmobileno = cMobileNo.slice(3, 14);
    debugger;
    var data: Customer;
    this.customerService.getCustomer(cmobileno).subscribe((customer: any) => {
      if (customer.status) {
        data = customer.customer[0];
        console.log(data.CID + data.MobileNo);
      }
    });
    return data.CID;
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then(result => {
      this.user = result.user;
      console.log(result.user)
    }).catch(error => console.log(error, "Incorrect code entered?"));

    if (this.user) {
      debugger;
      this.router.navigate(['/']);
    }
  }

  loginStatus() {
    this.loggged = false;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.user = user;
        this.loggged = true;
        console.log("USER LOGGED IN" + user.phoneNumber);
        localStorage.setItem('currentUser', JSON.stringify(user.phoneNumber));
      } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN");
      }
    });
    return this.loggged;
  }
}
