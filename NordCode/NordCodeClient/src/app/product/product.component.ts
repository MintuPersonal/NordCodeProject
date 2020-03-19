import { Component, OnInit } from '@angular/core';
import { Ecom_Product } from './products';
import { ProductService } from './product.service';
import { PageEvent } from '@angular/material';
import { HttpEventType, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  PID: any;
  message: string;
  imagePath: any;
  imgURL: string | ArrayBuffer;
  imgURLLarge: string | ArrayBuffer;
  imgURLExLarge: string | ArrayBuffer;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  };

  constructor(private _productService: ProductService, private http: HttpClient) {
    this.ngOnInit();
  }

  selected = 'option2';
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  productModel = new Ecom_Product();

  productModels: Ecom_Product[];
  Title = 'demo';
  hide: boolean;
  errorMsg: false;
  isEdit = 0;
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
    var data = this._productService.getProduct(this.productModel).subscribe((data: Ecom_Product[]) => {
      this.productModels = data;
      console.log(this.productModels);
    });
    //console.log(this.productModels);
    debugger;
    return data;
  };

  onSubmit(event) {

    this.productModel.SID = 0;
    this.productModel.Rol = 0;
    this.productModel.ParentId = 0;
    this.productModel.Img_Path = '../assets/img/member/' + this.productModel.FileUrl;
    this.productModel.Inserted_By = "Mitnu";
    this.productModel.Inserted_Date = new Date();
    if (this.isEdit == 0) {
      this.productModel.PID = 0;
    }
    this._productService.setProduct(this.productModel).subscribe(data => this.PID = data.PID, error => this.errorMsg = error.statusText)
    this.onClear();

  };

  onClear() {
    console.log('Clear All');
    this.productModel = new Ecom_Product();
    this.productModel.Display = "Banner";
    this.productModel.Active = true;
    this.imgURL = "../assets/img/member/Mahatab.png";
    this.imgURLLarge = "../assets/img/member/Mahatab.png";
    this.imgURLExLarge = "../assets/img/member/Mahatab.png";
  };

  preview(files, Id) {
    if (files.length === 0)
      return;

    this.productModel.FileUrl = files[0].name;
    this.productModel.FileExtension = files[0].type;
    this.productModel.FileImage = files[0].size;
    this.productModel.TrackedId = window.location.hostname;
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
  };

  editItem(item) {
    this.isEdit = 1;
    return this.productModel = item;
    // this.imgURL = item.Img_Path;
    // this.imgURLLarge = item.Img_Path;
    // this.imgURLExLarge = item.Img_Path;
  }

  deleteItem(pid) {
    alert('Are you confirm delete data');
    if (pid > 0) {
      this._productService.deleteProduct(pid).subscribe((data: Ecom_Product[]) => { this.productModels = data });
      this.ngOnInit();
    }
  }


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.previewImage();
  }

  previewImage() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('files', this.fileData);

  //   this.fileUploadProgress = '0%';

  //   this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
  //   //this.http.post('https://console.firebase.google.com/project/mitu-77f76/storage/mitu-77f76.appspot.com/fileUpload', formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //     .subscribe(events => {
  //       if (events.type === HttpEventType.UploadProgress) {
  //         this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
  //         console.log(this.fileUploadProgress);
  //       } else if (events.type === HttpEventType.Response) {
  //         this.fileUploadProgress = '';
  //         console.log(events.body);
  //         alert('SUCCESS !!');
  //       }

  //     })
  // }
};
