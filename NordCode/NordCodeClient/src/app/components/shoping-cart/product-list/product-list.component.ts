import { Component, OnInit } from '@angular/core';
//import { Ecom_Commercial } from 'src/app/models/Product';
import { CommercialService } from 'src/app/services/commercial.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Ecom_Commercial } from 'src/app/models/Commercial';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  featuresModels: any;
  commercialObj: object[];
  categoriesModel: any;
  bannersModel: any;
  brandsModel: any;
  featuresModel: any;
  newitems: Ecom_Commercial[];
  newData: Ecom_Commercial[];
  itemPrice: any;

  totalItemsPrice: any = 0;
  totalItemsCount: any = 0;
  individualItemCount: any = 0;
  itemState: Ecom_Commercial[] = [];
  itemCount: number = 0;
  newline: Ecom_Commercial;
  isItemLocalStorage: any;
  pCategoryName: any;
  productsModel: any;
  count: any;

  constructor(private _commercialService: CommercialService) { }

  //commercialModel = new Ecom_Commercial(0, '', 0, 0);
  _commercialModel: Object[];
  commercialModels = [] //Ecom_Commercial[];

  ngOnInit() {
    //localStorage.setItem('item', null);
    this._commercialService.getCommercial().subscribe(
      data => {
        this.commercialObj = data as object[];	 // FILL THE ARRAY WITH DATA.
        this._commercialModel = this.commercialObj['homeobj'];

        this.categoriesModel = this._commercialModel['categories'];
        this.bannersModel = this._commercialModel['banners'];
        this.brandsModel = this._commercialModel['brands'];
        this.featuresModel = this._commercialModel['features'];
        this.productsModel = this._commercialModel['products'];
        
        this.count = this.productsModel.length;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )
    // this.HasThisItem({});
  }

  Search() {
    if (this.pCategoryName != "") {
      this.featuresModel = this.featuresModel.filter(res => {
        return res.PName.toLocaleLowerCase().match(this.pCategoryName.toLocaleLowerCase())
      });
    } else {
      this.ngOnInit();
    }
  }
}