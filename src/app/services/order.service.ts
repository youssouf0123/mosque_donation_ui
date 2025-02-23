import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { Order } from "../model/order.interface"

@Injectable({
	providedIn: "root",
})
export class OrderService {
	
	private apiServerUrl = environment.apiUrl

	constructor(private http: HttpClient) {}

	public getAllPendingOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(
			`${this.apiServerUrl}/orders/allPendingOrders`,
		)
	}

	public getAllConfirmedOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(
			`${this.apiServerUrl}/orders/allConfirmedOrders`,
		)
	}

	public getOrdersByDate(date: any): Observable<Order[]> {
		return this.http.get<Order[]>(
			`${this.apiServerUrl}/orders/findOrdersByDate/${date}`,
		)
	}

	public getOrderByDateRange(from: any, to: any): Observable<Order[]> {
		return this.http.get<Order[]>(
			`${this.apiServerUrl}/orders/findOrdersByDateRange/${from}/${to}`,
		)
	}

	public getOrderById(orderId: number): Observable<Order> {
		return this.http.get<Order>(`${this.apiServerUrl}/orders/find/${orderId}`)
	}

	public printOrderById(orderId: number): Observable<any> {
		return this.http.get<any>(
			`${this.apiServerUrl}/orders/printOrder/${orderId}`,
		)
	}

	public printOrder(orderId: number): Observable<Order> {
		return this.http.get<Order>(`${this.apiServerUrl}/orders/print/${orderId}`)
	}

	public addOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(`${this.apiServerUrl}/orders/add`, order)
	}

	public deleteOrder(orderId: number): Observable<void> {
		return this.http.delete<void>(
			`${this.apiServerUrl}/orders/delete/${orderId}`,
		)
	}

	public updateOrder(order: Order): Observable<Order> {
		return this.http.put<Order>(`${this.apiServerUrl}/orders/update`, order)
	}

	public getPdf(orderId: number): Observable<any> {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		}

		return this.http.get<any>(
			`${this.apiServerUrl}/orders/downloadPDF/${orderId}`,
			httpOptions,
		)
	}

	public findOrderByIdForEdit(orderId: number, status: string): Observable<any> {
		return this.http.get<any>(`${this.apiServerUrl}/orders/edit/${orderId}/${status}`)
	}
	
	public findConfirmedOrderById(orderId: number): Observable<any> {
		return this.http.get<any>(`${this.apiServerUrl}/orders/find/confirmed/${orderId}`)
	}

	public processReturns(returns: any): Observable<any> {
//	public processReturns(order: Order): Observable<Order> {
		return this.http.post<Order>(`${this.apiServerUrl}/orders/returns`, returns);
	}
}