import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommercialService {
  constructor(private _http: HttpClient) { }
  getCommercial() {
    return this._http.get(environment.baseurl + 'gethomes');
  }
  getAddtoCart() {    
    return this._http.get(environment.baseurl + 'getaddtocart');
  }

  Search() {
    // if (this.pCategoryName != "") {
    //   this.featuresModel = this.featuresModel.filter(res => {
    //     return res.PName.toLocaleLowerCase().match(this.pCategoryName.toLocaleLowerCase())
    //   });
    // } else {
    //   this.ngOnInit();
    // }
  }
}
