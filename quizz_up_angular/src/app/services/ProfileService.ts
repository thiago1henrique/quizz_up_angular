// services/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // Corrija para a URL de usuários
  private apiUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  // Use a interface User existente
  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  public isAdmin(userId: string): Observable<boolean> {
    return this.getUserById(userId).pipe(
      map(user => user.role === 'ADMIN'),
      catchError(() => of(false))
    );
  }
}
