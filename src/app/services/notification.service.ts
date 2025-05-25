import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action: string = 'OK', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top', // or 'bottom'
      horizontalPosition: 'right', // 'center' | 'left' | 'right'
    });
  }

}