import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  categories = ['orange', 'palegoldenrod', 'palegreen', 'peachpuff', 'rosybrown', 'salmon', 'sandybrown']

  constructor() { }

  ngOnInit() {
  }

}
