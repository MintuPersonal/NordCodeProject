import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Ecom_Orders } from 'src/app/models/Order';
import { Ecom_OrderDetails } from 'src/app/models/OrderDetails';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orsers: Ecom_Orders[];
  customerId: any = 0;
  ordertotal: number = 0;
  orserdetails: Ecom_OrderDetails[];
  details: boolean = true;
  newOrders: Ecom_Orders[]
  Address: string;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    var cmobileno = '01911788115'
    this.customerService.getCustomer(cmobileno).subscribe((customer: any) => {
      this.customerId = customer.customer[0].Id;

      this.customerService.getOrders(this.customerId).subscribe((orsers: Ecom_Orders[]) => {
        //this.ordertotal = orsers.length;
        this.orsers = orsers;
      });
    });
  }

  public OrderDetails(order: Ecom_Orders) {
    this.customerService.getOrderDetails(order.TONumber).subscribe((orserdetails: any) => {
      if (orserdetails.OrderDetails.length) {
        this.Address = order.Address;
        this.orserdetails = orserdetails.OrderDetails;
        this.newOrders = [];
        this.orsers.forEach(item => {
          if (item.TONumber == order.TONumber) {
            item.Active = false;
            this.newOrders.push(item);
          } else {
            item.Active = true;
            this.newOrders.push(item);
          }
        })
        this.orsers = this.newOrders;
      }
    });
  }

  public OrderClose(order: Ecom_Orders) {
    this.orserdetails = [];
    this.Address = '';
    this.orsers.forEach(item => {
      if (item.TONumber == order.TONumber) {
        item.Active = true;
        this.newOrders.push(item);
      }
    })
    this.orsers = this.newOrders;
  }
}

