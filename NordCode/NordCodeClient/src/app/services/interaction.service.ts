import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ecom_Product } from '../models/Product';
import { HeaderComponent } from '../components/shared/header/header.component';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {


  private _teacherMessageSource = new Subject<Ecom_Product>();

  constructor(private productService: ProductService) { }

  ////////////// Here New Concept  ///////////////
  sendForAddtoCart(featureItem: Ecom_Product) {
    this._teacherMessageSource.next(featureItem);
  }
  sendForRemoveFromCart(featureItem: Ecom_Product) {   
    this.productService.RemoveProductFromCart(featureItem, true); 
    this._teacherMessageSource.next(featureItem);   
  }
  getForAddtoCart() {
    return this._teacherMessageSource.asObservable();
  }

  ////////////// Here New Concept  ///////////////

}
