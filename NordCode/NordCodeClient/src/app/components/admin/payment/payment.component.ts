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
  TOnumber: string;
  constructor(private customerService: CustomerService, private route: ActivatedRoute,
    private productService: ProductService, private router: Router) { }
  displayedColumn: string[] = ['Address'];
  displayedColumns: string[] = ['Add', 'OrderNo', 'Qty', 'UnitPrice', 'Close'];


  orderModels: Ecom_Orders[];
  ngOnInit() {
    debugger;
    if (this.productService.GetStayThisPage()) {
      this.TOnumber = this.productService.TONumber
      this.TONumber = this.TOnumber.slice(3, 15);
      this.TotalPrice = this.productService.TotalPrice;
      this.Address = this.productService.Address;

      this.customerService.getOrderDetails(this.TOnumber).subscribe((orderModel) => {
        this.OrderObj = orderModel as object[];	 // FILL THE ARRAY WITH DATA.
        this.Order = this.OrderObj['OrderDetails'];
        debugger;
        if (this.Order.length) {
          this.itemState = [];
          this.itemState = this.Order;
        }
      });

    } else {
      this.router.navigate(['/']);
    }
  }
}
