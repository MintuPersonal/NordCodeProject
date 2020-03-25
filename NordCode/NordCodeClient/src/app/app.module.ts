import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatDatepickerModule, MatBadgeModule,
  MatSelectModule, MatSliderModule, MatTableModule, MatNativeDateModule
} from '@angular/material';
import { MatCheckboxModule, MatPaginatorModule, MatTooltipModule, MatFormFieldModule, MatSidenavModule, 
  MatMenuModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddnewComponent } from './addnew/addnew.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommercialComponent } from './commercial/commercial.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MenubarComponent } from './menubar/menubar.component';
import { BrandComponent } from './components/shoping-cart/brand/brand.component';
import { CategoryComponent } from './components/shoping-cart/category/category.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProductListComponent } from './components/shoping-cart/product-list/product-list.component';
import { ProductItemComponent } from './components/shoping-cart/product-list/product-item/product-item.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { CheckoutComponent } from './components/shoping-cart/checkout/checkout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { ImageComponent } from './components/common/image/image.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';


//I keep the new line
const appRoutes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addnew', component: AddnewComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'productdetails/:productId', component: ProductdetailsComponent },
  { path: 'commercial', component: CommercialComponent },
  { path: 'menubar', component: MenubarComponent },
  { path: 'checkout/:price', component: CheckoutComponent },
  { path: 'payment/:order/:price', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'phonelogin', component: PhoneLoginComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    BrandComponent,
    CategoryComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,

    LoginComponent,
    SignupComponent,
    NavbarComponent,
    AddnewComponent,
    HomeComponent,
    ProductComponent,
    ProductdetailsComponent,
    CommercialComponent,
    CheckoutComponent,
    MenubarComponent,
    OrderComponent,
    PaymentComponent,
    BannerComponent,
    ImageComponent,
    PhoneLoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MaterialTimePickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSliderModule,
    MatPaginatorModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDialogModule
  ],

  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})

export class AppModule {
}
