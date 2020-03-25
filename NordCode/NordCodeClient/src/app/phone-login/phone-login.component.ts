import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

import * as firebase from 'firebase';

export class PhoneNumber {
  country: string;
  line: string;
  get e164() {
    return `+${this.line}`;
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

  constructor(private win: WindowService) { }

  ngOnInit() {
    var firebaseConfig = {
      apiKey: "AIzaSyAABTcunn62aKYHkJGkfnr5JhXA-D9Ztak",
      authDomain: "otp-ecommerce.firebaseapp.com",
      databaseURL: "https://otp-ecommerce.firebaseio.com",
      projectId: "otp-ecommerce",
      storageBucket: "otp-ecommerce.appspot.com",
      messagingSenderId: "932041012966",
      appId: "1:932041012966:web:9936106c9ea4e508e42d27"     
    };
    firebase.initializeApp(firebaseConfig);
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

    this.loginStatus();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      }).catch(error => console.log(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then(result => {
      this.user = result.user;
      console.log(result.user)
    })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

  loginStatus() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const condition = true;
        console.log("USER LOGGED IN" + user.phoneNumber);
        //debugger;
      } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN");
      }
    });
  }
}
