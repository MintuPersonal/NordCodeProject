import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ecom_Setting } from '../models/Setting';
import { Customer } from '../models/Customer';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  Setting: Ecom_Setting[];
  constructor(private _http: HttpClient) {
  }

  getSettingAll(gid: number) {
    return this._http.get(environment.baseurl + 'getsettingall');
  };

  public SetSetting(setting: Ecom_Setting[]) {
    this.Setting = setting;
  }
  public getSetting(): Ecom_Setting[] {
    return this.Setting;
  }

  public getSettingInfoByFilterId(filterId: number): Ecom_Setting[] {
    this.getSettingAll(filterId).subscribe((data: any) => {
      this.Setting = data.setting;
      this.Setting = this.Setting.filter(res => { if (res.GID == filterId) { return res; } });
    });
    return this.Setting
  }

  public sendCustomerMail(customerModel: Customer) {
    return this._http.post<Customer>(environment.baseurl + 'sendmail', customerModel);
  }

  public upload(formData) { 
    return this._http.post<any>(environment.baseurl + 'uploadfile', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
