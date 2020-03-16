import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  categories = ['orange', 'palegoldenrod', 'palegreen', 'peachpuff', 'rosybrown', 'salmon', 'sandybrown']

  constructor() { }

  ngOnInit() {
  }

}
