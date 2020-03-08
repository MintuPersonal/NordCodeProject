import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';

import { MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatDatepickerModule, MatBadgeModule, MatSelectModule, MatSliderModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddnewComponent } from './addnew/addnew.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { FlexLayoutModule } from '@angular/flex-layout';

//I keep the new line
const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addnew', component: AddnewComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'productdetails/:productId', component: ProductdetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    AddnewComponent,
    HomeComponent,
    ProductComponent,
    ProductdetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
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
    //MatNativeDateModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSliderModule
  ],

  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})

export class AppModule {
}
