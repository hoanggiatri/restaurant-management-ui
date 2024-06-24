import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateOrderDto, Order, UpdateOrderDto } from '../interfaces/order';
import { CreateOrderResponse, ServiceResponse } from '../interfaces/service-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string = environment.apiUrl + 'Order'

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(orderData: CreateOrderDto): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(this.apiUrl, orderData);
  }

  updateOrder(id: string, orderData: UpdateOrderDto): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.apiUrl}/${id}`, orderData);
  }

  deleteOrder(id: string): Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${this.apiUrl}/${id}`);
  }
}
