import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, UpdateCategory } from '../interfaces/category';
import { environment } from '../../environments/environment';
import { ServiceResponse } from '../interfaces/service-response';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = environment.apiUrl + 'Category';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  addCategory(category: UpdateCategory): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(this.apiUrl, category);
  }

  updateCategory(id: string, category: UpdateCategory): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${this.apiUrl}/${id}`);
  }
}
