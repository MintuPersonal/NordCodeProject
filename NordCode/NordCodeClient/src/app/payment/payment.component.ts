import { Component, OnInit } from '@angular/core';
import { Ecom_Commercial } from '../commercial/Commercial';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Ecom_Orders } from '../order/order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  itemState: any[];
  newline: Ecom_Commercial;
  OrderNo: number;
  Adderess: any;
  constructor(private _customerService: CustomerService, private route: ActivatedRoute, ) { }
  displayedColumn: string[] = ['Address'];
  displayedColumns: string[] = ['Add','OrderNo', 'Qty', 'UnitPrice', 'Close'];


  orderModels: Ecom_Orders[];
  ngOnInit() {
    // debugger;

    // var totalQty = 5//storageItem[2];
    // var totalPrice = 500 //storageItem[3]
    //this.newline = new Ecom_Commercial(5, 'TTTT', 20, 500, 'X', 'A+');
    //this.itemState=this.newline);
    //this.itemState.push(this.newline);

    this.OrderNo = parseInt(this.route.snapshot.paramMap.get("order"));
    // const orderModel = new Ecom_Orders();
    // orderModel.OrderNo = this.OrderNo.toString();

    var data = this._customerService.getOrder(this.OrderNo).subscribe((orderModel: Ecom_Orders[]) => {
      // var newline = new Ecom_Orders();
      // newline.OId;
      // newline.OId;
      // newline.OrderNo;
      // newline.CustomerId;
      // newline.CouponId;
      // newline.PaymentId;
      // newline.Discount;
      // newline.Reason;
      // newline.Active;
      // newline.ProductId;
      // newline.UnitPrice;
      // newline.Qty;
      // newline.NetPrice;
      // newline.Address;
      // newline.Aria;
      // newline.DeliveryTime;
      // this.itemState.push(newline);
      this.Adderess = orderModel[0].Address;
      this.itemState = [];

      this.itemState = orderModel;
      //console.log(this.orderModels);
      //debugger;
    });
    //return data;
  }
}
