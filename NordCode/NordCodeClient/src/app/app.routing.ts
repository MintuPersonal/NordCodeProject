import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/shoping-cart/product-list/product-list.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AddnewComponent } from './components/admin/addnew/addnew.component';
import { LoginComponent } from './components/admin/login/login.component';
import { ProductComponent } from './components/admin/product/product.component';
import { ProductdetailsComponent } from './components/admin/productdetails/productdetails.component';
import { CommercialComponent } from './test/commercial/commercial.component';
import { CheckoutComponent } from './components/shoping-cart/checkout/checkout.component';
import { PaymentComponent } from './components/admin/payment/payment.component';
import { OrderComponent } from './components/admin/order/order.component';
import { PhoneLoginComponent } from './components/admin/phone-login/phone-login.component';
import { AlertHomeComponent } from './test/alert-home';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SignupComponent } from './components/admin/signup/signup.component';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { SearchComponent } from './components/shoping-cart/search/search.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { FilterComponent } from './components/shoping-cart/filter/filter.component';
import { FaqComponent } from './components/common/tmart/faq/faq.component';
import { StoryComponent } from './components/common/tmart/story/story.component';
import { ContactComponent } from './components/common/tmart/contact/contact.component';
import { PolicyComponent } from './components/common/tmart/policy/policy.component';
import { TermsComponent } from './components/common/tmart/terms/terms.component';
import { TmartComponent } from './components/common/tmart/tmart.component';
import { CorporateComponent } from './components/common/tmart/corporate/corporate.component';
import { WishComponent } from './components/shoping-cart/wish/wish.component';


const routes: Routes = [
  { path: '', component: ProductListComponent }, //, pathMatch: 'full' 
  { path: 'myprofile', component: ProfileComponent },
  { path: 'myorders', component: OrderComponent },
  { path: 'payment/:order/:price', component: PaymentComponent },

  { path: 'category/:filter', component: FilterComponent },
  { path: 'search/:filter', component: SearchComponent },
  { path: 'wish', component: WishComponent },
  { path: 'cart', component: CartComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addnew', component: AddnewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'productdetails/:productId', component: ProductdetailsComponent },
  { path: 'commercial', component: CommercialComponent },
  { path: 'checkout/:total', component: CheckoutComponent },
  { path: 'phonelogin', component: PhoneLoginComponent },
  { path: 'alerthome', component: AlertHomeComponent },
  { path: 'logindialog', component: DialogComponent },

  { path: 'tmart/corporate', component: CorporateComponent },
  { path: 'tmart/faq', component: FaqComponent},
  { path: 'tmart/story', component:  StoryComponent},
  { path: 'tmart/contact', component: ContactComponent},
  { path: 'tmart/policy', component: PolicyComponent},
  { path: 'tmart/terms', component:  TermsComponent},
  
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }

];

export const RoutingModule = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }); //, { onSameUrlNavigation: 'reload' }

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule  { }