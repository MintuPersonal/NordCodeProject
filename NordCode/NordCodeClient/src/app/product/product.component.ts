import { Component, OnInit } from '@angular/core';
import { Ecom_Product } from './products';
import { ProductService } from './product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./prod uct.component.css']
})

export class ProductComponent implements OnInit {
  PID: any;
  message: string;
  imagePath: any;
  imgURL: string | ArrayBuffer;
  imgURLLarge: string | ArrayBuffer;
  imgURLExLarge: string | ArrayBuffer;

  constructor(private _productService: ProductService) { }

  selected = 'option2';
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  productModel = new Ecom_Product();

  productModels: Ecom_Product[];
  Title = 'demo';
  hide: boolean;
  errorMsg: false;
  public searchContact: string;
  public products = [
    { isFavorite: false, productId: 1, name: 'Apple', title: 'Apple', price: 500, description: ' quia recusandae aut.' },
    { isFavorite: true, productId: 2, name: 'Angur', title: 'Angur', price: 700, description: ' quia recusandae aut.' },
    { isFavorite: false, productId: 3, name: 'Orage', title: 'Orage', price: 800, description: ' quia recusandae aut.' },
    { isFavorite: true, productId: 4, name: 'Aner', title: 'Aner', price: 100, description: ' quia recusandae aut.' },
    { isFavorite: false, productId: 5, name: 'Piyara', title: 'Piyara', price: 150, description: ' quia recusandae aut.' }
  ];
  public displays = [
    { name: 'Banner', title: 'Banner', },
    { name: 'Categories', title: 'Categories', },
    { name: 'Brand', title: 'Brand', },
    { name: 'Popular', title: 'Popular', },
    { name: 'Feature', title: 'Feature', }];

  pictures = [
    { 'date': new Date, 'title': 'Mr Rahman', 'time': '10-12 pm', 'location': 'Bangladesh', 'IsDone': true, 'IsDelete': true },
    { 'date': new Date('29 nov 2019'), 'title': 'Mr Rahman', 'time': '10-12 pm', 'location': 'Bangladesh', 'IsDone': false, 'IsDelete': false }
  ];

  ngOnInit() {
    return this._productService.getProduct(this.productModel).subscribe((data: Ecom_Product[]) => { this.productModels = data });
  }

  onSubmit(event) {

    this.productModel.SID = 0;
    this.productModel.Rol = 0;
    this.productModel.ParentId = 0;
    this.productModel.Img_Path = 'Images/Products/' + this.productModel.FileUrl;
    this.productModel.Inserted_By = "";
    this._productService.setProduct(this.productModel).subscribe(data => this.PID = data.PID, error => this.errorMsg = error.statusText)
    this.onClear();
  }

  onClear() {
    console.log('all clear')
    //this.taskModel = {task_id: '', title: '', description: '', date: new Date(), time_from: '', time_to: '', location: '', notify: '', email: '', priority: 0, isDelete: false, isDone: false, create_at: new Date(), user_Information_user_id: '' }
  }

  preview(files, Id) {
    if (files.length === 0)
      return;

    this.productModel.FileUrl = files[0].name;
    this.productModel.FileExtension = files[0].type;
    this.productModel.FileImage = files[0].size;
    this.productModel.TrackedId = window.location.hostname
    debugger
    if (this.productModel.FileExtension.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.message = "";

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.imgURLLarge = reader.result;
      this.imgURLExLarge = reader.result;

    }
    console.log(files)
  }
}
