import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input() categoryItem: any;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  public SetRouteValue(category: any) {
    this.route.navigate(['search/', category.PName]);
  }

}
