import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  WishList: Cart[];
  totalItem: number;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.WishList = [];
    this.totalItem = 0;
    this.WishList = this.productService.wishList;
    this.totalItem = this.WishList.length;
  }

  public RemoveFromWishList(index: number) {
    if (index !== -1) {
      this.WishList.splice(index, 1);
    }
  }
}
