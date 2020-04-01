import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  categories = ['Baby Food', 'Baby Items', 'Clering Product', 'Cosmetics', 'Electronic', 'Grocery', 'Mens Product']
//categories = ['Baby Food', 'Baby Items', 'Clering Product', 'Cosmetics', 'Electronic', 'Grocery', 'Mens Product']
  
  constructor() { }

  ngOnInit() {
  }

}
