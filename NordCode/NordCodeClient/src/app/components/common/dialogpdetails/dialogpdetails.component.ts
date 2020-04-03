import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InteractionService } from 'src/app/services/interaction.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-dialogpdetails',
  templateUrl: './dialogpdetails.component.html',
  styleUrls: ['./dialogpdetails.component.css']
})
export class DialogpdetailsComponent implements OnInit {
  
  @Input() featureItem: any;
  constructor( private _interactionService : InteractionService,
    public dialogRef: MatDialogRef<DialogpdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  onAddToBag() {
    debugger;
    this._interactionService.sendForAddtoCart(this.featureItem);
  }

  onRemoveFromBag() {
    this._interactionService.sendForRemoveFromCart(this.featureItem);
  }


}
