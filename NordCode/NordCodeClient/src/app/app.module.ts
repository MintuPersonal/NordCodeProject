import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoutingModule } from './app.routing'
import { AlertModule } from './test/_alert';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AddnewComponent } from './components/admin/addnew/addnew.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ProductComponent } from './components/admin/product/product.component';
import { CommercialComponent } from './test/commercial/commercial.component';
import { BrandComponent } from './components/shoping-cart/brand/brand.component';
import { CategoryComponent } from './components/shoping-cart/category/category.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProductListComponent } from './components/shoping-cart/product-list/product-list.component';
import { ProductItemComponent } from './components/shoping-cart/product-list/product-item/product-item.component';
import { ProductdetailsComponent } from './components/admin/productdetails/productdetails.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { CheckoutComponent } from './components/shoping-cart/checkout/checkout.component';
import { OrderComponent } from './components/admin/order/order.component';
import { PaymentComponent } from './components/admin/payment/payment.component';
import { ImageComponent } from './components/common/image/image.component';
import { PhoneLoginComponent } from './components/admin/phone-login/phone-login.component';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { AlertHomeComponent } from './test/alert-home/alert-home.component';
import { TopNavComponent } from './test/top-nav/top-nav.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NavbarService } from './services/navbar.service';
import { SignupComponent } from './components/admin/signup/signup.component';
import { DialogpdetailsComponent } from './components/common/dialogpdetails/dialogpdetails.component';

import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule,
  MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatBadgeModule, MatPaginatorModule, MatFormFieldModule, MatTableModule
} from '@angular/material';
import { SearchComponent } from './components/shoping-cart/search/search.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { CategoryItemComponent } from './components/shoping-cart/filter/category-item/category-item/category-item.component';
import { FilterComponent } from './components/shoping-cart/filter/filter.component';
import { BusinesspolicyComponent } from './components/common/tmart/businesspolicy/businesspolicy.component';
import { FaqComponent } from './components/common/tmart/faq/faq.component';
import { StoryComponent } from './components/common/tmart/story/story.component';
import { PolicyComponent } from './components/common/tmart/policy/policy.component';
import { TermsComponent } from './components/common/tmart/terms/terms.component';
import { ContactComponent } from './components/common/tmart/contact/contact.component';
import { TmartComponent } from './components/common/tmart/tmart.component';
import { CorporateComponent } from './components/common/tmart/corporate/corporate.component';
import { ContactformComponent } from './components/common/tmart/contact/contactform/contactform.component';


@NgModule({
  declarations: [AppComponent, BannerComponent, BrandComponent, CategoryComponent, HeaderComponent,
    FooterComponent, ProductListComponent, ProductItemComponent, CartComponent, LoginComponent, SignupComponent,
    NavbarComponent, AddnewComponent, HomeComponent, ProductComponent, ProductdetailsComponent, CommercialComponent,
    CheckoutComponent, OrderComponent, PaymentComponent, BannerComponent, ImageComponent, PhoneLoginComponent,
    DialogComponent, AlertHomeComponent, TopNavComponent, MenuComponent, MenuComponent, DialogpdetailsComponent,
    SearchComponent, ProfileComponent, CategoryItemComponent, FilterComponent, BusinesspolicyComponent, FaqComponent,
    StoryComponent, ContactComponent, PolicyComponent, TermsComponent, TmartComponent, CorporateComponent, ContactformComponent],
  imports: [
    RoutingModule, AlertModule, BrowserModule, NgbModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule, MatIconModule, MatInputModule, MatRadioModule, MatCheckboxModule,
    MatButtonModule, MatListModule, MatCardModule, MatToolbarModule, MatDatepickerModule, MaterialTimePickerModule,
    MatNativeDateModule, FlexLayoutModule, MatSelectModule, MatSliderModule, MatGridListModule, MatButtonModule,
    MatMenuModule, MatIconModule, MatCardModule, MatSidenavModule, MatInputModule, MatTooltipModule,
    MatBadgeModule, MatPaginatorModule, MatFormFieldModule, MatTableModule, MatExpansionModule, MatChipsModule,
    MatButtonToggleModule, MatDialogModule, MatTabsModule],

  providers: [MatDatepickerModule, NavbarService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
