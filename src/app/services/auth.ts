import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'auth_user';
  private readonly API_URL = 'http://localhost:3000/profile';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // Método para fazer login
  login(userId: string): void {
    localStorage.setItem(this.AUTH_KEY, userId);
  }

  // Método para fazer logout
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getUserId();
  }

  // Obtém o ID do usuário logado (MÉTODO QUE ESTAVA FALTANDO)
  getUserId(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }

  // Verifica se o usuário é admin
  isAdmin(): Observable<boolean> {
    const userId = this.getUserId(); // Agora este método existe
    if (!userId) {
      return of(false);
    }
    return this.http.get<any>(`${this.API_URL}/${userId}`).pipe(
      map(user => user?.isAdmin || false)
    );
  }

  // Obtém os dados completos do usuário
  getUserData(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      return of(null);
    }
    return this.http.get<any>(`${this.API_URL}/${userId}`);
  }
}

"save this"
