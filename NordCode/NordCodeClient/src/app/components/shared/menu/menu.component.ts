import { Component, HostBinding, Input, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavItem } from '../../../models/nav-item';
import { NavbarService } from '../../../services/navbar.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ])
  ]
})
export class MenuComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  //@ViewChild('file', { static: false }) file: ElementRef;
  constructor(public navService: NavbarService, private productService: ProductService,
    public elm: ElementRef, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        //console.log(`Checking '/${this.item.route}' against '${url}'`);       
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        //console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }
  onItemSelected(item: NavItem) {

    if (!item.ChildAnswers || !item.ChildAnswers.length) {
      this.router.navigate([item.route]);
      this.productService.SetProductScearchFilter(item.Text);
      this.router.navigate(['search/' + item.Text.toLocaleLowerCase()]);
      //alert('item first condition')
    }
    if (item.ChildAnswers && item.ChildAnswers.length) {
      this.expanded = !this.expanded;
      
      if (item.Text != "" && item.ParentId == 0) {
        this.router.navigate(['/category', item.Text]);
      }else if(item.Text != "" && item.ParentId > 0){
        this.productService.SetProductScearchFilter('');
        this.router.navigate(['search/' + item.Text.toLocaleLowerCase()]);
      }
      else {
        this.router.navigate(['/']);
      }
      //alert('item 2nd condition')
    }
  }
}
