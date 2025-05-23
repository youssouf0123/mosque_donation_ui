import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Donation } from '../model/donation.interface';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiServerUrl}/donation`);
  }

  public getDonationById(donationId: number): Observable<Donation> {
    return this.http.get<Donation>(`${this.apiServerUrl}/donation/${donationId}`);
  }

  public getDonationsByTypeAndQuantity(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/donation/ByTypeAndQty`);
  }

  public addDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.apiServerUrl}/donation`, donation);
  }

  public updateDonation(donation: Donation): Observable<Donation> {
    return this.http.put<Donation>(`${this.apiServerUrl}/donation`, donation);
  }

  public deleteDonation(donationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/donation/${donationId}`);
  }

}