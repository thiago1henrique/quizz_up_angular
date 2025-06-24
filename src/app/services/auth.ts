import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(userId: string): void {
    localStorage.setItem('user_id', userId);
  }

  logout(): void {
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user_id');
  }
}
