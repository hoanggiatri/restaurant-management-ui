import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateOrderItemDto, OrderItem, UpdateOrderItemDto } from '../interfaces/order-item';
import { ServiceResponse } from '../interfaces/service-response';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  apiUrl:string = environment.apiUrl + 'OrderItem'

  constructor(private http: HttpClient) { }

  getAllOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl);
  }

  getOrderItemsByOrderId(orderId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/byOrderId/${orderId}`);
  }

  getOrderItemById(id: string): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/${id}`);
  }

  createOrderItem(orderItemData: CreateOrderItemDto): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(this.apiUrl, orderItemData);
  }

  updateOrderItem(id: string, orderItemData: UpdateOrderItemDto): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.apiUrl}/${id}`, orderItemData);
  }

  deleteOrderItem(id: string): Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${this.apiUrl}/${id}`);
  }
}
