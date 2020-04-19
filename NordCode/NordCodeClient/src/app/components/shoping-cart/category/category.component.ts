import { Component, OnInit } from '@angular/core';
import { CommercialService } from 'src/app/services/commercial.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  brands = [
    '120000_aci.jpg', '120000_det.jpg', '120000_rad.jpg', '120000_tan.jpg', '120000_man.jpg', '120000_sun.jpg',
    '120000_rin.jpg', '120000_tan.jpg', '120000_whe.jpg', '120000_sun.jpg', '120000_rin.jpg', '120000_gar.jpg',
    '120000_jui.jpg', '120000_mol.jpg', '120000_nat.jpg', '120000_orp.jpg', '120000_rfl.jpg', '120000_fro.jpg',
    '120000_fai.jpg', '120000_dan.jpg', '120000_com.jpg', '120000_col.jpg', '120000_coc.jpg', '120000_cle.jpg',
    '120000_rup.jpg', '120000_niv.jpg'].map((n) => `../assets/img/product/brand/${n}`);
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  categories = []; //['Baby Food', 'Baby Items', 'Clering', 'Cosmetics', 'Electronic', 'Grocery', 'Mens Product']
  commercialObj: object[];
  commercialModel: any;
  categoriesModel: any;
  category = [];
  length: number;

  constructor(private commercialService: CommercialService, private productService: ProductService) { }

  ngOnInit() {
    this.commercialService.getCommercial().subscribe((data: any) => {
      if (data.status) {
        this.commercialObj = data as object[];
        this.commercialModel = this.commercialObj['homeobj'];

        this.categoriesModel = this.commercialModel['categories'];
        this.categoriesModel = this.categoriesModel.filter(res => {
          if (res.ParentId == 0) {
            return res
          }
        });
        
        if (this.categoriesModel.length) {
          this.length = Math.round(this.categoriesModel.length / 6);
        }
        var k = 0;
        for (let index = 0; index < this.length; index++) {
          this.category = [];
          var l = 6 * index;
          var m = 0;
          var tlength = this.categoriesModel.length

          for (let j = 0; j < 6; j++) {
            if (l + j == this.categoriesModel.length) {
              l = 0;
            }

            if (j != tlength) {
              m = j;
            }
            else {
              m = 0;
            }
            this.category.push(this.categoriesModel[l + m].Category);
          }
          this.categories.push(this.category);
        }
      }
    });
  }

  public SetRouteValue(text: string) {
    this.productService.SetProductScearchFilter(text);
  }
}
