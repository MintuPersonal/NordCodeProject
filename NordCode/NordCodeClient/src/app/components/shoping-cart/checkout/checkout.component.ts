import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Ecom_Orders } from 'src/app/order/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: any;
  customerId: string;

  constructor(private route: ActivatedRoute, private _customerService: CustomerService) { }

  // @Input() totalItemsPrice: any;

  ngOnInit() {
    this.totalPrice = this.route.snapshot.paramMap.get("price");
    this.customerId = '1111';//this.route.snapshot.paramMap.get("customerId")
    //this.LoadItemTotal();    
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

  onSubmit(info) {
    alert(info.Address)
    var order = new Ecom_Orders(1, '1111', '22222', '3333', '1', '20', 'Test', 1, 1, 200, 5, 150);

    //  order.Address = info.Address,
    //  order.DeliveryAddress = info.Address,
    //  order.DeliveryTime = info.DeliveryTime
    //)
    debugger;
    this._customerService.setOrder(order)

  }
  onClear() {

  }
}
