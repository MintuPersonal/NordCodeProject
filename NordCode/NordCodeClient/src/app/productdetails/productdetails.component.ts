import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { products } from '../product/products';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  public product;
  
  productlist = [
    { isFavorite: false, productId: 1, name: 'Apple', title: 'Apple', price: 500, description: ' quia recusandae aut.' },
    { isFavorite: true, productId: 2, name: 'Angur', title: 'Angur', price: 700, description: ' quia recusandae aut.' },
    { isFavorite: false, productId:3, name: 'Orage', title: 'Orage', price: 800, description: ' quia recusandae aut.' },
    { isFavorite: true, productId: 4, name: 'Aner', title: 'Aner', price: 100, description: ' quia recusandae aut.' },
    { isFavorite: false, productId: 5, name: 'Piyara', title: 'Piyara', price: 150, description: ' quia recusandae aut.' }
  ];
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => { 
      this.product = this.productlist[parseInt(params.get('productId'))-1]; //++params.get('productId')
    });    
  }
}
