import { Component, OnInit } from '@angular/core';
import { CommercialService } from 'src/app/services/commercial.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  commercialObj: object[];
  commercialModel: any;
  featuresModel: any;
  pCategoryName: string;
  totalItems: boolean = false;
  productsModel: any;
  filter: string;
  categoriesModel: any;
  productsModelFilter: any;

  constructor(
    private _commercialService: CommercialService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filter = this.route.snapshot.paramMap.get('filter');
    this._commercialService.getCommercial().subscribe(
      data => {
        this.commercialObj = data as object[];
        this.commercialModel = this.commercialObj['homeobj'];
        this.productsModel = this.commercialModel['products'];
        this.categoriesModel = this.commercialModel['categories'];
        this.pCategoryName = this.productService.pCategoryName;
        this.totalItems = this.productsModel.length;
        if (this.pCategoryName != "") {
          this.productsModel = this.productsModel.filter(res => {
            return res.PName.toLocaleLowerCase().match(this.pCategoryName.toLocaleLowerCase())
          });
        }
        else if (this.filter != '') {
          this.categoriesModel = this.categoriesModel.filter(res => {
            if (res.Category != null) {
              return res.Category.toLocaleLowerCase().match(this.filter.toLocaleLowerCase())
            }
          });

          if (this.categoriesModel.length) {
            this.productsModelFilter = [];
            this.categoriesModel.forEach(element => {
              this.CategoryFilterMethod(element);
            });
            this.productsModel = this.productsModelFilter
          }
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

  private CategoryFilterMethod(element: any) {
    this.productsModelFilter = this.productsModel.filter(res => {
      if (res.ParentId == element.PID) {
        return res
      }
    });
  }
}
