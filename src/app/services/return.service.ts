import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from "rxjs"

import { Return } from "../model/return.interface"

@Injectable({
	providedIn: 'root'
})
export class ReturnService {

	private apiServerUrl = environment.apiUrl;

	constructor(private httpClient: HttpClient) { }

	public getAllReturns(): Observable<any[]> {
//	public getAllReturns(): Observable<Return[]> {
		return this.httpClient.get<Return[]>(
			`${this.apiServerUrl}/returns/all`,
		)
	}

	public getPdf(returnId: number): Observable<any> {
		const httpClientOptions = {
			responseType: "arraybuffer" as "json",
		}

		return this.httpClient.get<any>(
			`${this.apiServerUrl}/returns/downloadPDF/${returnId}`,
			httpClientOptions,
		)
	}

	public processReturns(returns: any): Observable<any> {
		//	public processReturns(order: Order): Observable<Order> {
		return this.httpClient.post<Return>(`${this.apiServerUrl}/returns/add`, returns);
	}
}