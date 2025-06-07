import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recipient } from '../model/recipient.interface';

import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class RecipientDataService {

  private apiServerUrl = environment.apiUrl;

  dataChange: BehaviorSubject<Recipient[]> = new BehaviorSubject<Recipient[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: NotificationService) { }

  get data(): Recipient[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDonations(): void {
    this.httpClient.get<Recipient[]>(`${this.apiServerUrl}/recipients`).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error);
        // console.log(error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addDonation(donation: Recipient): void {
    this.httpClient.post(`${this.apiServerUrl}/recipients`, donation).subscribe(data => {
      this.dialogData = donation;
      this.toasterService.show('Successfully added', 'OK', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.show('Error occurred. Details: ' + err.name + ' ' + err.message, 'ERROR', 8000);
      });
  }

  updateDonation(donation: Recipient): void {
    this.httpClient.put(`${this.apiServerUrl}/recipients`, donation).subscribe(data => {
      this.dialogData = donation;
      this.toasterService.show('Successfully edited', 'OK', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.show('Error occurred. Details: ' + err.name + ' ' + err.message, 'ERROR', 8000);
      }
    );
  }

  deleteDonation(id: number): void {
    this.httpClient.delete(`${this.apiServerUrl}/recipients/${id}`).subscribe(data => {
      this.toasterService.show('Successfully deleted', 'OK', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.show('Error occurred. Details: ' + err.name + ' ' + err.message, 'ERROR', 8000);
      }
    );
  }

  // private apiServerUrl = environment.apiUrl;

  // constructor(private http: HttpClient) { }

  // public getDonations(): Observable<Recipient[]> {
  //   return this.http.get<Recipient[]>(`${this.apiServerUrl}/recipients`);
  // }

  // public getDonationById(recipientId: number): Observable<Recipient> {
  //   return this.http.get<Recipient>(`${this.apiServerUrl}/recipients/${recipientId}`);
  // }

  // public addDonation(donation: Recipient): Observable<Recipient> {
  //   return this.http.post<Recipient>(`${this.apiServerUrl}/recipients`, donation);
  // }

  // public updateDonation(donation: Recipient): Observable<Recipient> {
  //   return this.http.put<Recipient>(`${this.apiServerUrl}/recipients`, donation);
  // }

  // public deleteDonation(recipientId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiServerUrl}/recipients/${recipientId}`);
  // }

}