import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Ecom_Orders } from '../../../models/Order';
import { ProductService } from 'src/app/services/product.service';
import { Customer } from 'src/app/models/Customer';


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
  Address: any;
  //orderModel: Ecom_Orders;

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, private _customerService: CustomerService) { }
  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  @Input() totalAmounts: any;
  @Input() totalItemsPrice: any;
  orderModel = new Ecom_Orders();
  customerModel = new Customer();
  ngOnInit() {

    if (this.productService.GetStayThisPage()) {
      this.TONumber = this.productService.TONumber;
      this.TotalPrice = this.productService.TotalPrice;
      this.customerModel.CID = this.productService.GetCustomerID();
      this.customerModel.MobileNo = '0' + this.customerModel.CID;

      this._customerService.getCustomer(this.customerModel.MobileNo).subscribe((data: any) => {
        if (data.status) {
          var newcustomer = data.customer[0];
          this.orderModel.Address = newcustomer.Address;
          // this.Address = newcustomer.Address;
          this.orderModel.Area = newcustomer.Aria;
        } else {
          this.orderModel.Address = ''
          this.orderModel.Area = '';
        }
      });

    } else {
      this.router.navigate(['/']);
    }
  }
  public LoadItemTotal() {

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
    this.productService.Address = _order.Address;
    this.productService.Area = _order.Area;

    var order = new Ecom_Orders();
    order.OID = 0;
    order.CustomerId = this.CustomerId;
    order.TONumber = this.TONumber;
    order.Address = _order.Address;
    order.Area = _order.Area;
    order.DeliveryTime = _order.DeliveryTime;
    order.Reason = _order.Reason;

    // order.CouponId = 3333;
    // order.PaymentModeId = 1;
    // order.Discount = 20;
    // order.TotalItemQty = 5;
    // order.DeliveryCharge = 20;

    order.TrackedId = 'http://americantmartbd.com/api/'; //environment.baseurl;
    order.CreateBy = this.CustomerId;
    order.CreateDate = new Date();
    order.Active = true;
    order.Delete = false;

    this._customerService.updateOrder(order).subscribe();

    var TONumber = this.productService.TONumber.slice(3, 15);
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
  
}
