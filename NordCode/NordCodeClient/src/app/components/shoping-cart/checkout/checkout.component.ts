import { Component, OnInit, Input, SystemJsNgModuleLoader } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Ecom_Orders } from '../../../models/order';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
//import { Ecom_Orders } from 'src/app/order/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  TotalPrice: number;
  CustomerId: number;
  UnitPrice: number;
  OrderNo: string;
  _totalAmounts: any;

  constructor(private route: ActivatedRoute, private productService : ProductService, private _customerService: CustomerService) { }
  @Input() totalAmounts: any;
  @Input() totalItemsPrice: any;

  ngOnInit() {
    this.TotalPrice = parseInt(this.route.snapshot.paramMap.get("total"));
    this.CustomerId = 2020888; // + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    this.OrderNo = '2020555';
    //this.TotalPrice = this.TotalPrice; 
    debugger;
    //this.productService.getCartItemsFromLocal();
  }

  public LoadItemTotal() {
    debugger;
    var hasitemdata = JSON.parse(localStorage.getItem('item'));
    if (hasitemdata != null) {
      var _totalItemsPrice = 0;
      Object.keys(hasitemdata).forEach(key => {
        const iteming = hasitemdata[key];
        const intervale = Object.keys(iteming).map(key => iteming[key]);
        _totalItemsPrice = _totalItemsPrice + intervale[3];
      });
      // this._totalItemsPrice = _totalItemsPrice;
    }
    else {

    }
  };

  onSubmit(_product: Ecom_Orders) {
    var order = new Ecom_Orders();
    order.OID = 0;
    order.OrderNo = this.OrderNo;
    order.CustomerId = this.CustomerId + this.TotalPrice;
    order.CouponId = 3333;
    order.PaymentModeId = 1;
    order.Discount = 20;
    order.Reason = _product.Reason;
    order.Active = true;
    order.Qty = 5;
    order.UnitPrice = this.UnitPrice;   
    order.NetPrice = this.UnitPrice;
    order.TotalPrice = this.TotalPrice; 
    order.Address = _product.Address;
    order.Aria = _product.Aria;
    order.DeliveryTime = _product.DeliveryTime;

    order.TrackedId = environment.baseurl;
    order.CreateBy = environment.currentuserId; 
    order.CreateDate = new Date();
    order.Active = true;
    order.Delete = false;
    debugger;
    var data = this._customerService.setOrder(order);

  }
  onClear() {

  }
}
