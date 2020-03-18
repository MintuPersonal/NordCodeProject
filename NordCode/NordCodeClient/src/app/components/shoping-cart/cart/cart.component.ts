import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalItemsCount: any;
  commercialModels: any;
  totalItemsPrice: any;

  constructor() { }

  ngOnInit() {
        
  }  
  
  openCartNav() {
    document.getElementById("cartnav").style.width = "250px";
    document.getElementById("maincart").style.marginLeft = "250px";
  }
  
  closeCartNav() {
    document.getElementById("cartnav").style.width = "0";
    document.getElementById("maincart").style.marginLeft= "0";
  }  
}
