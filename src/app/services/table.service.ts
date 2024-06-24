import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTableDto, Table, UpdateTableDto } from '../interfaces/table';
import { ServiceResponse } from '../interfaces/service-response';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  apiUrl:string = environment.apiUrl + 'Table'

  constructor(private http: HttpClient) { }

  // Get all tables
  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}`);
  }

  // Get table by ID
  getTableById(id: string): Observable<Table> {
    return this.http.get<Table>(`${this.apiUrl}/${id}`);
  }

  // Create a new table
  createTable(tableData: CreateTableDto): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(`${this.apiUrl}`, tableData);
  }

  // Update table by ID
  updateTable(id: string, tableData: UpdateTableDto): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.apiUrl}/${id}`, tableData);
  }

  // Delete table by ID
  deleteTable(id: string): Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${this.apiUrl}/${id}`);
  }
}
