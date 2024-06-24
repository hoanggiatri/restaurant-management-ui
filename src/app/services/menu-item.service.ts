import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem, UpdateMenuItem } from '../interfaces/menu-item';
import { environment } from '../../environments/environment';
import { ServiceResponse } from '../interfaces/service-response';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  apiUrl: string = environment.apiUrl + 'Menu';

  constructor(private http: HttpClient) { }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  getMenuItemById(id: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}/${id}`);
  }

  getMenuItemsByCategory(categoryName: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/byCategory/${categoryName}`);
  }

  addMenuItem(menuItem: UpdateMenuItem): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(this.apiUrl, menuItem);
  }

  updateMenuItem(id: string, menuItem: UpdateMenuItem): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.apiUrl}/${id}`, menuItem);
  }

  deleteMenuItem(id: string): Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${this.apiUrl}/${id}`);
  }
}
