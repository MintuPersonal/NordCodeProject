import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  category = ['red', 'yellow', 'overage', 'black', 'accent', 'Miss']
  brandModels = [1111, 2, 1111, 4, 1111, 6, 7];
  popularModels = [1, 2, 3, 4];


}
