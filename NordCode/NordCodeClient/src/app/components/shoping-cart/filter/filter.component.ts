import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommercialService } from 'src/app/services/commercial.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  commercialObj: object[];
  commercialModel: any;
  featuresModel: any;
  pCategoryName: string;
  totalItems: boolean = false;
  productsModel: any;
  category: string;
  categoriesModel: any;
  categoriesModelAll: any;

  constructor(private _commercialService: CommercialService, private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.category = this.route.snapshot.paramMap.get('filter');
    this._commercialService.getCommercial().subscribe(
      data => {
        this.commercialObj = data as object[];
        this.commercialModel = this.commercialObj['homeobj'];
        this.categoriesModelAll = this.commercialModel['categories'];
        this.categoriesModel = this.commercialModel['categories'];
        this.totalItems = this.categoriesModel.length;   
       
        if (this.category != '') {
          this.categoriesModel = this.categoriesModel.filter(res => {
            if (res.Category.toLocaleLowerCase() == this.category.toLocaleLowerCase()) {
              return res;
            }
          });
        }
        else {
          this.pCategoryName = this.productService.pCategoryName;
        }
        if (this.categoriesModel.length && this.categoriesModel[0].ParentId == 0) {
          this.categoriesModelAll = this.categoriesModelAll.filter(res => {
            if (res.ParentId == this.categoriesModel[0].PID) {
              return res 
            }           
          });
        }
        this.categoriesModel = this.categoriesModelAll;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })


  }

}
