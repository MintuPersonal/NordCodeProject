import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { ProductService } from 'src/app/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedService } from 'src/app/services/shared.service';
import { Ecom_Setting } from 'src/app/models/Setting';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {

  featureItem: any[];
  filterId: number;
  Birthday: FormControl;
  Setting: Ecom_Setting[];
  sucessMsg: string = '';
  errorMsg: string;

  constructor(private productService: ProductService, private sharedService: SharedService) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  ngOnInit(): void {
    this.featureItem = [];
    this.featureItem.push('Contact Us');
    this.filterId = 7;
    //this.Setting = this.sharedService.getSettingInfoByFilterId(this.filterId);
    this.sharedService.getSettingAll(this.filterId).subscribe((data: any) => {
      this.Setting = data.setting;
      this.Setting = this.Setting.filter(res => {
        if (res.GID == this.filterId) {
          return res;
        }
      });
      this.featureItem.push(this.Setting[0].ImgPath);
    });
  }

  customerModel = new Customer();
  public EndDateChange(event): void {
    this.customerModel.Birthday = event.value;
  }


  onSubmit() {
    this.customerModel;
    this.customerModel.TONumber = 'Message From Website'    
    //https://myaccount.google.com/lesssecureapps
    this.sharedService.sendCustomerMail(this.customerModel).subscribe((data: any) => {
      if (data) {
        this.sucessMsg = "Mail has been send to the company support team";
        this.customerModel.Name = '';
        this.customerModel.Email = '';
        this.customerModel.Message = '';
        this.customerModel.MobileNo = '';        
      } else {
        this.errorMsg = "Server error contact to the support team.";
      }
    });

  };
  onClear() {
    this.customerModel = new Customer();
  }

}
