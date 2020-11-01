import { Component, OnInit } from '@angular/core';
import { CommercialService } from 'src/app/services/commercial.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Ecom_Commercial } from 'src/app/models/Commercial';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  commercialObj: object[];
  commercialModel: Object[];
  categoriesModel: Object[];
  bannersModel: Object[];
  brandsModel: Object[];
  productsModel: Object[];
  featuresModel: any; 
  pCategoryName: string;

  constructor(private commercialService: CommercialService, private productService : ProductService) {    
    this.productService._cartItems = [];
    this.commercialService.getCommercial().subscribe(data => {
      this.commercialObj = data as object[];
      this.commercialModel = this.commercialObj['homeobj'];
      this.categoriesModel = this.commercialModel['categories'];
      this.bannersModel = this.commercialModel['banners'];
      this.brandsModel = this.commercialModel['brands'];
      this.featuresModel = this.commercialModel['features'];
      this.productsModel = this.commercialModel['products'];
    });
  }

  ngOnInit() {

  }

  public Search() {
    if (this.pCategoryName != "") {
      this.featuresModel = this.featuresModel.filter(res => {
        return res.PName.toLocaleLowerCase().match(this.pCategoryName.toLocaleLowerCase())
      });
    }
  }
}