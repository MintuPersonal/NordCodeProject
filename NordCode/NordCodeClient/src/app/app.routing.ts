import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/shoping-cart/product-list/product-list.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AddnewComponent } from './addnew/addnew.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CommercialComponent } from './commercial/commercial.component';
import { CheckoutComponent } from './components/shoping-cart/checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { AlertHomeComponent } from './alert-home';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: ProductListComponent}, //, pathMatch: 'full' 
  { path: 'cart', component: CartComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addnew', component: AddnewComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'productdetails/:productId', component: ProductdetailsComponent },
  { path: 'commercial', component: CommercialComponent },  
  { path: 'checkout/:price', component: CheckoutComponent },
  { path: 'payment/:order/:price', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'phonelogin', component: PhoneLoginComponent },
  { path: 'alerthome', component: AlertHomeComponent },

  { path: '**', redirectTo: '' }

];

export const RoutingModule = RouterModule.forRoot(routes);