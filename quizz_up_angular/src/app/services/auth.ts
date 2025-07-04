import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID_KEY = 'auth_user';
  private readonly USER_PROFILE_KEY = 'auth_user_profile';
  private readonly LOGIN_API_URL = 'http://localhost:3000/auth/login';
  private readonly USERS_API_URL = 'http://localhost:3000/users';

  private currentUser: User | null = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userProfile = localStorage.getItem(this.USER_PROFILE_KEY);
    if (userProfile) {
      try {
        this.currentUser = JSON.parse(userProfile);
      } catch (e) {
        console.error('Erro ao analisar perfil do usuário do localStorage', e);
        this.logout();
      }
    }
  }

  private saveUserToStorage(user: User): void {
    this.currentUser = user;
    localStorage.setItem(this.USER_PROFILE_KEY, JSON.stringify(user));
  }

  loginWithCredentials(email: string, password: string): Observable<User> {
    return this.http.post<any>(this.LOGIN_API_URL, { email, password }).pipe(
      tap(res => {
        if (res && res.accessToken && res.user) {
          localStorage.setItem(this.TOKEN_KEY, res.accessToken);
          localStorage.setItem(this.USER_ID_KEY, res.user.id);
          this.saveUserToStorage(res.user);
        } else {
          throw new Error('Resposta de login inválida');
        }
      }),
      map(res => res.user),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Falha na autenticação'));
      })
    );
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.USER_PROFILE_KEY);
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): string | null {
    const userId = localStorage.getItem(this.USER_ID_KEY);
    // Verifica se o userId existe e é uma string numérica
    if (userId && /^\d+$/.test(userId)) {
      return userId;
    }
    return null;
  }

  getUserProfile(): Observable<User | null> {
    if (this.currentUser) {
      return of(this.currentUser);
    }

    const userId = this.getUserId();
    if (!userId) {
      return of(null);
    }

    return this.http.get<User>(`${this.USERS_API_URL}/${userId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(user => this.saveUserToStorage(user)),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  isAdmin(): Observable<boolean> {
    if (this.currentUser && this.currentUser.role) {
      return of(this.currentUser.role === 'admin');
    }

    return this.getUserProfile().pipe(
      map(user => user?.role === 'ADMIN' || false),
      catchError(() => of(false))
    );
  }

  refreshUserProfile(): Observable<User> {
    const userId = this.getUserId();
    if (!userId) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    return this.http.get<User>(`${this.USERS_API_URL}/${userId}`).pipe(
      tap(user => this.saveUserToStorage(user)),
      catchError(error => {
        console.error('Failed to refresh user profile:', error);
        return throwError(() => new Error('Erro ao atualizar perfil'));
      })
    );
  }
}
