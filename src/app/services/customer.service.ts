import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer } from '../model/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiServerUrl = environment.apiUrl;
  constructor( private http: HttpClient ) { }
  public getCustomers (): Observable<Customer[]>
  {
    return this.http.get<Customer[]>(`${this.apiServerUrl}/customer/all`);
  }

  public getCustomerById (prdId: number): Observable<Customer>
  {
    return this.http.get<Customer>(`${this.apiServerUrl}/customer/find/${prdId}`);
  }
    
  public addCustomer (prd: Customer): Observable<Customer>
  {
    return this.http.post<Customer>(`${this.apiServerUrl}/customer/add`, prd);
  }

  public deleteCustomer (prdId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/customer/delete/${prdId}`);
  }

  public updateCustomer (prd: Customer): Observable<Customer>
  {
    return this.http.put<Customer>(`${this.apiServerUrl}/customer/update`, prd);
  }
}
