import { Component, OnInit } from '@angular/core';
//import { Ecom_Commercial } from '../../../models/Product';
import { CustomerService } from '../../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ecom_Orders } from '../../../models/Order';
import { Ecom_Commercial } from 'src/app/models/Commercial';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  itemState: Ecom_Orders[];
  newline: Ecom_Commercial;
  OrderNo: string;
  Address: any;
  TOOrderNumber: string;
  Order: Ecom_Orders[];
  OrderObj: object[];
  TONumber: string;
  TotalPrice: number;
  constructor(private _customerService: CustomerService, private route: ActivatedRoute,
    private productService: ProductService, private router: Router) { }
  displayedColumn: string[] = ['Address'];
  displayedColumns: string[] = ['Add', 'OrderNo', 'Qty', 'UnitPrice', 'Close'];


  orderModels: Ecom_Orders[];
  ngOnInit() {
    if (this.productService.GetStayThisPage()) {
      this.TONumber = this.productService.TONumber;
      this.TotalPrice = this.productService.TotalPrice;
    } else {
      this.router.navigate(['/']);
    }

    //this.OrderNo = this.route.snapshot.paramMap.get("order");
    // const orderModel = new Ecom_Orders();
    // orderModel.OrderNo = this.OrderNo.toString();

    var data = this._customerService.getOrder(this.OrderNo).subscribe((orderModel) => {

      this.OrderObj = orderModel as object[];	 // FILL THE ARRAY WITH DATA.
      this.Order = this.OrderObj['order'];
      debugger;
      if (this.Order.length) {
        this.itemState = [];
        this.itemState = this.Order;
        this.Address = this.Order[0].Address;
        this.TOOrderNumber = this.Order[0].TONumber.toString().slice(3, 12);
      }

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
      //console.log(this.orderModels);
      //debugger;
    });
    //return data;
  }
}
