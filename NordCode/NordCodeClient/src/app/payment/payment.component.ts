import { Component, OnInit } from '@angular/core';
import { Ecom_Commercial } from '../commercial/Commercial';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Ecom_Orders } from '../order/order';
import { Ecom_Product } from '../product/products';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  itemState: any[];
  newline: Ecom_Commercial;
  OrderNo: number;
  constructor(private _customerService: CustomerService, private route: ActivatedRoute, ) { }
  displayedColumn: string[] = ['Address'];
  displayedColumns: string[] = ['Add', 'Name', 'Qty', 'UnitPrice', 'Close'];

  
  orderModels: Ecom_Orders[];
  ngOnInit() {
    // debugger;
    // this.itemState = [];
    // var totalQty = 5//storageItem[2];
    // var totalPrice = 500 //storageItem[3]
    // this.newline = new Ecom_Commercial(5, 'TTTT', totalQty, totalPrice, 'X', 'A+');
    // this.itemState.push(this.newline);
    // this.itemState.push(this.newline);
    
    this.OrderNo = parseInt(this.route.snapshot.paramMap.get("order"));
    // const orderModel = new Ecom_Orders();
    // orderModel.OrderNo = this.OrderNo.toString();

    var data = this._customerService.getOrder(this.OrderNo).subscribe((data: Ecom_Orders[]) => {
      this.orderModels = data;
      console.log(this.orderModels);
      debugger;
    });
    return data;
  }
}
