import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Ecom_Orders } from 'src/app/models/Order';
import { Ecom_OrderDetails } from 'src/app/models/OrderDetails';
import { Customer } from 'src/app/models/Customer';
import { ProductService } from 'src/app/services/product.service';

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
  ordersOrgin: Ecom_Orders[];
  TONumber: string;
  constructor(private customerService: CustomerService, private productService: ProductService, ) { }
  customerModel = new Customer();
  ngOnInit() {
    this.customerModel.CID = this.productService.GetCustomerID();
    this.customerModel.MobileNo = '0' + this.customerModel.CID;
    this.customerService.getOrders(this.customerModel.CID).subscribe((orsers: Ecom_Orders[]) => {
      this.orsers = orsers;
    });
  }

  public OrderDetails(order: Ecom_Orders) {
    this.TONumber = order.TONumber;
    this.customerService.getOrderDetails(order.TONumber).subscribe((orserdetails: any) => {
      if (orserdetails.OrderDetails.length) {
        this.Address = order.Address;
        this.productService.TotalPrice = order.TotalPrice;
        this.productService.Address = order.Address;
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
        this.orsers = [];
        this.orsers = this.newOrders;
      }
    });
  }

  public OrderClose(order: Ecom_Orders) {
    this.ngOnInit();
    this.orserdetails = [];
    this.Address = '';
  }

  public addtoCart() {  
    this.orserdetails;  
    alert('Feature under constraction : ' + this.TONumber);

    // this.customerService.getOrderDetails(order.TONumber).subscribe((orserdetails: any) => {
    //   if (orserdetails.OrderDetails.length) {
    //     this.Address = order.Address;
    //     this.productService.TotalPrice = order.TotalPrice;
    //     this.productService.Address = order.Address;
    //     this.orserdetails = orserdetails.OrderDetails;
    //     this.newOrders = [];
    //     this.orsers.forEach(item => {
    //       if (item.TONumber == order.TONumber) {
    //         item.Active = false;
    //         this.newOrders.push(item);
    //       } else {
    //         item.Active = true;
    //         this.newOrders.push(item);
    //       }
    //     })
    //     this.orsers = [];
    //     this.orsers = this.newOrders;
    //   }
    // });
  }
}

