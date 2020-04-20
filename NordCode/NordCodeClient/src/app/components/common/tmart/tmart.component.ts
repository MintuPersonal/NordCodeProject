import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tmart',
  templateUrl: './tmart.component.html',
  styleUrls: ['./tmart.component.css']
})
export class TmartComponent implements OnInit {
  @Input() featureItem: any;
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'FAQ',
        link: '/tmart/faq',
        index: 0
      }, {
        label: 'Our Story',
        link: '/tmart/story',
        index: 1
      }, {
        label: 'Contact Us',
        link: '/tmart/contact',
        index: 2
      }, {
        label: 'Privacy Policy ',
        link: '/tmart/policy',
        index: 3
      }, {
        label: 'Terms of Use',
        link: '/tmart/terms',
        index: 4
      }
    ];
  }
  ngOnInit(): void {
    
    // if (this.featureItem == 'undefined') {
    //   this.featureItem = [];
    //   this.featureItem.push('T Mart');
    // }
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
