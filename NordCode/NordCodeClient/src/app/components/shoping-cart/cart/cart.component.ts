import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalItemsCount: any;
  commercialModels: any;
  totalItemsPrice: any;


  cartItems: [];
  cartTotal: number = 0;
  constructor(private _interactionService: InteractionService) { }
  ngOnInit() {
    // this._interactionService.getForAddtoCart().subscribe(featerItems => {
    //   console.log(featerItems);
    // });

    // this.cartItems.forEach(item => {
    //   this.cartTotal = 5 //(item.qty * item.price);
    // });
  }






  openCartNav() {
    document.getElementById("cartnav").style.width = "250px";
    document.getElementById("maincart").style.marginLeft = "250px";
  }

  closeCartNav() {
    document.getElementById("cartnav").style.width = "0";
    document.getElementById("maincart").style.marginLeft = "0";
  }
}
