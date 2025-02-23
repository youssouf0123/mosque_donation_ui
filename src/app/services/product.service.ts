import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../model/product.interface';
  
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
} )
export class ProductService {

  private apiServerUrl = environment.apiUrl;

  constructor( private http: HttpClient ) { }
  
  public getProducts (): Observable<Product[]>
  {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/all`);
  }

  public getProductById (prdId: number): Observable<Product>
  {
    return this.http.get<Product>(`${this.apiServerUrl}/product/find/${prdId}`);
  }
    
  public addProduct (prd: Product): Observable<Product>
  {
    return this.http.post<Product>(`${this.apiServerUrl}/product/add`, prd);
  }

  public deleteProduct (prdId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/product/delete/${prdId}`);
  }

  public updateProduct (prd: Product): Observable<Product>
  {
    return this.http.put<Product>(`${this.apiServerUrl}/product/update`, prd);
  }
}
