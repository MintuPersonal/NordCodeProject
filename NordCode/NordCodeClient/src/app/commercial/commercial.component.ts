import { Component, OnInit } from '@angular/core';
import { CommercialService } from './commercial.service';
import { Ecom_Commercial } from './Commercial';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {
  featuresModels: any;
  commercialObj: object[];
  categoriesModel: any;
  bannersModel: any;
  brandsModel: any;
  featuresModel: any;
  newitems: Ecom_Commercial;
  newData: Ecom_Commercial[];
  total: any;

  constructor(private _commercialService: CommercialService) { }
  commercialModel = new Ecom_Commercial();
  _commercialModel: Object[];
  commercialModels = [] //Ecom_Commercial[];

  ngOnInit() {

    this._commercialService.getCommercial(this.commercialModel).subscribe(
      data => {
        this.commercialObj = data as object[];	 // FILL THE ARRAY WITH DATA.
        this._commercialModel = this.commercialObj['homeobj'];

        this.categoriesModel = this._commercialModel['categories'];
        this.bannersModel = this._commercialModel['banners'];
        this.brandsModel = this._commercialModel['brands'];
        this.featuresModel = this._commercialModel['features'];

      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }

    )
  }

  
  isHidden = true;
  itemObj = new Array();

  addtobag(item: Ecom_Commercial) {  

    var data = this._commercialService.getAddtoCart(this.commercialModel).subscribe(
      (data: Ecom_Commercial[]) => {
        this.commercialModels = data

        Object.keys(this.commercialModels).forEach(key => {
          this.commercialModel = this.commercialModels[key];
          this.total = key;
          debugger;
          console.log(`key is ${key} and value is ${this.commercialModel.UnitePrice}`);
        });
       // this.total = this.commercialModels.length;
      });

    //this.total = data;
    // this.newitems = { 'PId': item.PId, 'PName': item.PName, 'Qty': 5, 'UnitePrice': 50000 };
    // this.itemObj.push(this.newitems);
    // console.log(this.itemObj);
  }

  minustobag(item) {
    this.total -= 1;
    // const index = this.items.indexOf(item);
    // this.items.splice(index, 1);
  }

  displayedColumns: string[] = ['PId', 'PName', 'Qty', 'UnitPrice'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }

}
