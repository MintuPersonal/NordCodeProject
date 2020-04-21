import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Ecom_Setting } from 'src/app/models/Setting';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  featureItem: any[];
  filterId: number;
  Setting: Ecom_Setting[];
  constructor(private sharedService: SharedService) { }
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
}

