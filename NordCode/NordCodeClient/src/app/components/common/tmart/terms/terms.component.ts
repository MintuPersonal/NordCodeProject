import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Ecom_Setting } from 'src/app/models/Setting';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  featureItem: any[];
  filterId: number;
  Setting: Ecom_Setting[];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.featureItem = [];
    this.featureItem.push('Terms of Use');

    this.filterId = 5;
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
