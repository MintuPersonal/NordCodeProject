import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  featureItem: any[];

  constructor() { }

  ngOnInit(): void {
    this.featureItem = [];
    this.featureItem.push('Terms of Use');
  }

}
