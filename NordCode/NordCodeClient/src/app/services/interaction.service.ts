import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/Cart';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _teacherMessageSource = new Subject<Cart>();
  constructor(private productService: ProductService) { }
  
  ////////////// Here New Concept  ///////////////
  sendForAddtoCart(featureItem: Cart) {
    this._teacherMessageSource.next(featureItem);
  }
  sendForRemoveFromCart(featureItem: Cart) {   
    this.productService.RemoveProductFromCart(featureItem, true); 
    this._teacherMessageSource.next(featureItem);   
  }
  getForAddtoCart() {
    return this._teacherMessageSource.asObservable();
  }
  ////////////// Here New Concept  ///////////////
}
