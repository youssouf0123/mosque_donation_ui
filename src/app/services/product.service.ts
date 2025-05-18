import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Donation } from '../model/donation.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiServerUrl}/product/all`);
  }

  public getProductQuantityAndType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/product/typeQty`);
  }

  public getProductById(prdId: number): Observable<Donation> {
    return this.http.get<Donation>(`${this.apiServerUrl}/product/find/${prdId}`);
  }

  public addProduct(prd: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.apiServerUrl}/product/add`, prd);
  }

  public deleteProduct(prdId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/product/delete/${prdId}`);
  }

  public updateProduct(prd: Donation): Observable<Donation> {
    return this.http.put<Donation>(`${this.apiServerUrl}/product/update`, prd);
  }

}