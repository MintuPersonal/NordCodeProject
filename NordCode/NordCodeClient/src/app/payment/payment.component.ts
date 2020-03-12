import { Component, OnInit } from '@angular/core';
import { Ecom_Commercial } from '../commercial/Commercial';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  itemState: any[];
  newline: Ecom_Commercial;
  orderModels: any[];

  constructor() { }
  displayedColumns: string[] = ['Add', 'Name', 'Qty', 'UnitPrice', 'Close'];
  ngOnInit() {
    this.itemState = [];
    var totalQty = 5//storageItem[2];
    var totalPrice = 500 //storageItem[3]
    this.newline = new Ecom_Commercial(5, 'TTTT', totalQty, totalPrice, 'X', 'A+');
    this.itemState.push(this.newline);
    this.itemState.push(this.newline);
    
    this.orderModels = this.itemState;
  }
}
