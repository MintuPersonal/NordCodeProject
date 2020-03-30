import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/shoping-cart/product-list/product-list.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AddnewComponent } from './components/admin/addnew/addnew.component';
import { SignupComponent } from './components/admin/signup/signup.component';
import { LoginComponent } from './components/admin/login/login.component';
import { ProductComponent } from './components/admin/product/product.component';
import { ProductdetailsComponent } from './components/admin/productdetails/productdetails.component';
import { CommercialComponent } from './commercial/commercial.component';
import { CheckoutComponent } from './components/shoping-cart/checkout/checkout.component';
import { PaymentComponent } from './components/admin/payment/payment.component';
import { OrderComponent } from './components/admin/order/order.component';
import { PhoneLoginComponent } from './components/admin/phone-login/phone-login.component';
import { AlertHomeComponent } from './alert-home';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: ProductListComponent}, //, pathMatch: 'full' 
  { path: 'profile', component: SignupComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'payment/:order/:price', component: PaymentComponent },

  { path: 'cart', component: CartComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addnew', component: AddnewComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'productdetails/:productId', component: ProductdetailsComponent },
  { path: 'commercial', component: CommercialComponent },  
  { path: 'checkout/:price', component: CheckoutComponent },  
  { path: 'phonelogin', component: PhoneLoginComponent },
  { path: 'alerthome', component: AlertHomeComponent },

  { path: '**', redirectTo: '' }

];

export const RoutingModule = RouterModule.forRoot(routes);