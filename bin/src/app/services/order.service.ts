import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../model/product.interface';
import { Order } from '../model/order.interface';
  
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiServerUrl = environment.apiUrl;

  constructor( private http: HttpClient ) { }
  
  public getOrders (): Observable<Order[]>
  {
    return this.http.get<Order[]>("http://localhost:8081/autoshop/orders/all");
  }

  public getOrderById (orderId: number): Observable<Order>
  {
    return this.http.get<Order>(`${this.apiServerUrl}/orders/find/${orderId}`);
  }
    
  public addOrder (order: Order): Observable<Order>
  {
    return this.http.post<Order>(`${this.apiServerUrl}/orders/add`, order);
  }

  public deleteOrder (orderId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/orders/delete/${orderId}`);
  }

  public updateOrder (order: Order): Observable<Order>
  {
    return this.http.put<Order>(`${this.apiServerUrl}/orders/update`, order);
  }
}
