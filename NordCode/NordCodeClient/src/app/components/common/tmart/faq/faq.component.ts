import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Ecom_Setting } from 'src/app/models/Setting';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  featureItem: string[];
  Setting: Ecom_Setting[];
  setting: Ecom_Setting;
  filterId: number;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.featureItem = [];
    this.featureItem.push('FAQ');
    this.filterId = 3;
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
