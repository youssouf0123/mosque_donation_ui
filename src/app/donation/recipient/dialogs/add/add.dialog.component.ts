import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Recipient } from 'src/app/model/recipient.interface';
import { RecipientDataService } from 'src/app/services/recipient.data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.css']
})
export class AddDialogComponent {

  gender: SelectItem[] = [
    { value: 0, viewValue: 'MALE' },
    { value: 1, viewValue: 'FEMALE' },
  ];

  status: SelectItem[] = [
    { value: 0, viewValue: 'INDIGENT' },
    { value: 1, viewValue: 'WIDOW' },
    { value: 2, viewValue: 'ORPHAN' },
    { value: 3, viewValue: 'REGULAR' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipient,
    public dataService: RecipientDataService
  ) {
    console.debug(data);
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    console.debug('onNoClick()');
    console.debug(this.data);
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.debug('confirmAdd()');
    // console.debug(this.data);
    this.dataService.addDonation(this.data);
  }

  trackItem(index: number, item: any) {
    // console.debug('trackItem => ' + item.value);
    return item.value;
  }

}

export interface SelectItem {
    value: number;
    viewValue: string;
}