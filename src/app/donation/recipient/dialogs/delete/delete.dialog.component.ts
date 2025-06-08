import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RecipientDataService } from 'src/app/services/recipient.data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.dialog.component.html',
  styleUrls: ['./delete.dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dataService: RecipientDataService
  ) {
    console.debug(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteDonation(this.data.id);
  }

}