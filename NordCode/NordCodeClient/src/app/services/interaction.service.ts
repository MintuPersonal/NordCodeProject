import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/Cart';
import { ProductService } from './product.service';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private interactionMessageSource = new Subject<Cart>();
  private interactionCustomerSource = new Subject<Customer>();
  constructor(private productService: ProductService) { }
  
  ////////////// Here New Concept  ///////////////
  public sendForAddtoCart(featureItem: Cart) {
    this.interactionMessageSource.next(featureItem);
  }
  public sendForRemoveFromCart(featureItem: Cart) {   
    this.productService.RemoveProductFromCart(featureItem, true); 
    this.interactionMessageSource.next(featureItem);   
  }
  public getForAddtoCart() {
    return this.interactionMessageSource.asObservable();
  }
  ////////////// Here New Concept  ///////////////

  public sendForLoginUpdate(customer: Customer) {
    this.interactionCustomerSource.next(customer);
  }

  public getForLoginUpdate() {
    return this.interactionCustomerSource.asObservable();
  }

}
