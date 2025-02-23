import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehicule } from '../model/vehicule.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private apiServerUrl = environment.apiUrl;
  constructor( private http: HttpClient ) { }
  public getVehicules (): Observable<Vehicule[]>
  {
    return this.http.get<Vehicule[]>(`${this.apiServerUrl}/vehicule/all`);
  }

  public getVehiculeById (prdId: number): Observable<Vehicule>
  {
    return this.http.get<Vehicule>(`${this.apiServerUrl}/vehicule/find/${prdId}`);
  }
    
  public addVehicule (prd: Vehicule): Observable<Vehicule>
  {
    return this.http.post<Vehicule>(`${this.apiServerUrl}/vehicule/add`, prd);
  }

  public deleteVehicule (prdId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/vehicule/delete/${prdId}`);
  }

  public updateVehicule (prd: Vehicule): Observable<Vehicule>
  {
    return this.http.put<Vehicule>(`${this.apiServerUrl}/vehicule/update`, prd);
  }
}
