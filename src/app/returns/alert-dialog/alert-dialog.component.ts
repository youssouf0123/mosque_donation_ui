import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-alert-dialog',
	templateUrl: './alert-dialog.component.html',
	styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

	ngOnInit(): void {
	}


	//	onCancel(): void {
	//		this.dialogRef.close();
	//	}


}