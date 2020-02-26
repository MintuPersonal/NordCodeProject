import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  constructor() { }
  errorMsg: false;
  public searchContact: string;
  public products = [
    { isFavorite: false, productId: 1, name: 'Apple', title: 'Apple', price: 500, description: ' quia recusandae aut.' },
    { isFavorite: true, productId: 2, name: 'Angur', title: 'Angur', price: 700, description: ' quia recusandae aut.' },
    { isFavorite: false, productId:3, name: 'Orage', title: 'Orage', price: 800, description: ' quia recusandae aut.' },
    { isFavorite: true, productId: 4, name: 'Aner', title: 'Aner', price: 100, description: ' quia recusandae aut.' },
    { isFavorite: false, productId: 5, name: 'Piyara', title: 'Piyara', price: 150, description: ' quia recusandae aut.' }
  ];

  pictures = [
    { 'date': new Date, 'title': 'Mr Rahman', 'time': '10-12 pm', 'location': 'Bangladesh', 'IsDone': true, 'IsDelete': true },
    { 'date': new Date('29 nov 2019'), 'title': 'Mr Rahman', 'time': '10-12 pm', 'location': 'Bangladesh', 'IsDone': false, 'IsDelete': false }
  ];

  ngOnInit() {

  }


}
