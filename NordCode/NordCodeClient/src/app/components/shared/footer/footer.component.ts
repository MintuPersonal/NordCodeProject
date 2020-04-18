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
  Support: string;
  Facebook: string;
  GooglePlus: string;
  Instagram: string;
  Linked: string;
  Twtter: string;
  Youtube: string;
  Whatapps: string;
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
          if(item.GID == 9)  
          {
            this.Support = item.Text
          } 
          if(item.GID == 2 && item.Code == '1'){
            this.Facebook = item.Text;            
          }
          if(item.GID == 2 && item.Code == '2'){
            this.GooglePlus = item.Text;            
          }
          if(item.GID == 2 && item.Code == '3'){
            this.Instagram = item.Text;            
          }
          if(item.GID == 2 && item.Code == '4'){
            this.Linked = item.Text;            
          }
          if(item.GID == 2 && item.Code == '5'){
            this.Twtter = item.Text;            
          }
          if(item.GID == 2 && item.Code == '6'){
            this.Youtube = item.Text;            
          }
          if(item.GID == 2 && item.Code == '7'){
            this.Whatapps = item.Text;            
          }
          
        });      
    });
  }
}
