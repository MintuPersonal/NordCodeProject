import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  featureItem: any[];

  constructor() { }

  ngOnInit(): void {
    this.featureItem = [];
    this.featureItem.push('Our Story');
  }

}
