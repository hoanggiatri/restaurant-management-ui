import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddUserDTO, UpdateUserDTO, UserDetail } from '../interfaces/user-detail';
import { AuthResponse } from '../interfaces/auth-response';
import { ServiceResponse } from '../interfaces/service-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  createUser(user: AddUserDTO): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(`${this.apiUrl}User`, user);
  }

  getUserById(userId: string): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.apiUrl}User/${userId}`);
  }

  updateUser(userId: string, user: UpdateUserDTO):Observable<ServiceResponse>{
    return this.http.put<ServiceResponse>(this.apiUrl + 'User/' + userId, user);
  }

  deleteUser(userId: string): Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${this.apiUrl}User/${userId}`);
  }

  getAllUsers(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(`${this.apiUrl}User`);
  }
}
