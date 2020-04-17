import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material';
import { SharedService } from 'src/app/services/shared.service';
import { Ecom_Setting } from 'src/app/models/Setting';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  version = VERSION;
  Setting: Ecom_Setting[];
  SettingModel : Ecom_Setting;
  Text : string;
  Mobile: string;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {    
    this.sharedService.getSettingAll().subscribe((data: any) => {
      if (data.status)
        this.Setting = data.setting;
        this.Setting.forEach(item=>{
          if(item.GID == 8){
            this.Text = item.Text 
          } 
          if(item.GID == 8){
            this.Text = item.Text
            this.Mobile = item.GText; 
          }           
        });      
    });
  }
}
