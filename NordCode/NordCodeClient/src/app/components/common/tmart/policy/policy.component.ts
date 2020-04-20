import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  featureItem: any[];

  constructor() { }

  ngOnInit(): void {
    this.featureItem = [];
    this.featureItem.push('Privacy Policy');
  }

}
