import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InteractionService } from 'src/app/services/interaction.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/models/Cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogpdetails',
  templateUrl: './dialogpdetails.component.html',
  styleUrls: ['./dialogpdetails.component.css']
})
export class DialogpdetailsComponent implements OnInit {

  @Input() feature_Item: any;
  _cartItems: any[];
  totalAmounts: number;
  totalItems: any;
  constructor(private productService: ProductService, private _interactionService: InteractionService,
    public dialogRef: MatDialogRef<DialogpdetailsComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Cart) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  public onAddToBag(featureItem) {
    debugger;
    this._interactionService.sendForAddtoCart(featureItem);
    this._getTotalAmounts(featureItem.PID);
  }

  public onRemoveFromBag(featureItem) {
    this._interactionService.sendForRemoveFromCart(featureItem);
    this._getTotalAmounts(featureItem.PID);
  }
  private _getTotalAmounts(pid) {
    this._cartItems = this.productService._cartItems;
    this._cartItems.forEach((item) => {
      this.totalAmounts += (item.Qty * item.UnitPrice);
      if (item.PID == pid) {

        this.data.totalItems = item.Qty;
        this.data.Qty = item.Qty;
      }
    });
  }
  public setBigImage(name: string) {
    this.data.ImgPath = name;    
  }
  public ViewWishList() {
    this.router.navigate(['wish']);   
  }
  public AddWishList(item: Cart) {
    this.productService.SetWishList(item);    
  }
}
