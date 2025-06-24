import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_KEY = 'user_id';

  constructor(private router: Router) { }

  login(userId: string): void {
    localStorage.setItem(this.AUTH_KEY, userId);
  }

  // 👇 ESTE MÉTODO PRECISA ESTAR EXATAMENTE ASSIM 👇
  logout(): void {
    // Ele remove o item do localStorage
    localStorage.removeItem(this.AUTH_KEY);
    // E depois redireciona para a página de login
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }
}
