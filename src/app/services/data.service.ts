import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Donation } from '../model/donation.interface';
import { NotificationService } from './notification.service';

@Injectable()
export class DataService {

  private apiServerUrl = environment.apiUrl;

  dataChange: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: NotificationService) { }

  get data(): Donation[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDonations(): void {
    this.httpClient.get<Donation[]>(`${this.apiServerUrl}/donations`).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error);
        // console.log(error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addDonation(donation: Donation): void {
    this.httpClient.post(`${this.apiServerUrl}/donations`, donation).subscribe(data => {
      this.dialogData = donation;
      this.toasterService.show('Successfully added', 'OK', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.show('Error occurred. Details: ' + err.name + ' ' + err.message, 'ERROR', 8000);
      });
  }

  updateDonation(donation: Donation): void {
    this.httpClient.put(`${this.apiServerUrl}/donations`, donation).subscribe(data => {
      this.dialogData = donation;
      this.toasterService.show('Successfully edited', 'OK', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.show('Error occurred. Details: ' + err.name + ' ' + err.message, 'ERROR', 8000);
      }
    );
  }

  deleteDonation(id: number): void {
    this.httpClient.delete(`${this.apiServerUrl}/donations/${id}`).subscribe(data => {
      this.toasterService.show('Successfully deleted', 'OK', 3000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.show('Error occurred. Details: ' + err.name + ' ' + err.message, 'ERROR', 8000);
      }
    );
  }

}