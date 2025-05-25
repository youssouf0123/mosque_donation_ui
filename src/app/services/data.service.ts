import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Donation } from '../model/donation.interface';

@Injectable()
export class DataService {

    private apiServerUrl = environment.apiUrl;
    
    dataChange: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);

    // Temporarily stores data from dialogs
    dialogData: any;

    constructor(private httpClient: HttpClient) { }

    get data(): Donation[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    /** CRUD METHODS */
    getAllDonations(): void {
        this.httpClient.get<Donation[]>(`${this.apiServerUrl}/donation`).subscribe(data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          // console.log(error.name + ' ' + error.message);
        });
    }

    // DEMO ONLY, you can find working methods below
    addDonation(donation: Donation): void {
        this.dialogData = donation;
    }

    updateDonation(donation: Donation): void {
        this.dialogData = donation;
    }

    deleteDonation(id: number): void {
        console.log(id);
    }

}


/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/