import { Component, OnInit } from '@angular/core';
import { CommercialService } from 'src/app/services/commercial.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  commercialObj: object[];
  _commercialModel: any;
  featuresModel: any;
  pCategoryName: string;
  totalItems: boolean = false;
  productsModel: any;

  constructor(private _commercialService: CommercialService, private productService: ProductService) { }

  ngOnInit() {
    this._commercialService.getCommercial().subscribe(
      data => {
        this.commercialObj = data as object[];	 // FILL THE ARRAY WITH DATA.
        this._commercialModel = this.commercialObj['homeobj'];
        //this.featuresModel = this._commercialModel['features'];
        this.productsModel = this._commercialModel['products'];
        this.pCategoryName = this.productService.pCategoryName;
        this.totalItems = this.productsModel.length;

        if (this.pCategoryName != "") {
          this.productsModel = this.productsModel.filter(res => {
            return res.PName.toLocaleLowerCase().match(this.pCategoryName.toLocaleLowerCase())
          });
        }
        else {
          this.pCategoryName = this.productService.pCategoryName;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )
  }
}
