import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Ecom_Orders } from '../../../models/Order';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  TotalPrice: number;
  CustomerId: number;
  UnitPrice: number;
  TONumber: string;
  _totalAmounts: any;
  //orderModel: Ecom_Orders;

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, private _customerService: CustomerService) { }
    //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  @Input() totalAmounts: any;
  @Input() totalItemsPrice: any;
  orderModel = new Ecom_Orders();

  ngOnInit() {

    if (this.productService.GetStayThisPage()) {
      this.TONumber = this.productService.TONumber;
      this.TotalPrice = this.productService.TotalPrice;

      this._customerService.getCustomer(this.productService.MobileNo).subscribe((data: any) => {
        if (data.status) {
          var newcustomer = data.customer[0];
          this.orderModel.Address = newcustomer.Address;
          this.orderModel.Aria = newcustomer.Aria;
        }
        this.orderModel.Address = ''
        this.orderModel.Aria = '';
      });

    } else {
      this.router.navigate(['/']);
    }
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

  onSubmit(_order: Ecom_Orders) {
    var order = new Ecom_Orders();
    order.OID = 0;
    order.CustomerId = this.CustomerId;
    order.TONumber = this.TONumber;
    // order.TotalPrice = this.TotalPrice;
    // order.NetPrice = this.TotalPrice;
    order.Address = _order.Address;
    order.Aria = _order.Aria;
    order.DeliveryTime = _order.DeliveryTime;
    order.Reason = _order.Reason;

    order.CouponId = 3333;
    order.PaymentModeId = 1;
    order.Discount = 20;
    order.TotalItemQty = 5;
    order.DeliveryCharge = 20;

    order.TrackedId = 'http://americantmartbd.com/api/'; //environment.baseurl;
    order.CreateBy = '11' //environment.currentuserId; 
    order.CreateDate = new Date();
    order.Active = true;
    order.Delete = false;

    this._customerService.updateOrder(order).subscribe();

    var TONumber = this.productService.TONumber;
    var TotalPrice = this.productService.TotalPrice
    if (TONumber != "" && TotalPrice != 0) {
      this.router.navigate(['/payment', TONumber, TotalPrice]);
    }
    else if (TONumber == "" && TotalPrice == 0) {
      this.router.navigate(['/', order.TotalPrice]);
    }
    else {
      this.router.navigate(['/checkout', order.TotalPrice]);
    }

  }
  onClear() {

  }
}
