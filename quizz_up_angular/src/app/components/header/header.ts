import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth';
import { User } from '../../models/user.model';
import { Observable, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  userProfile: User | null = null;
  isProfilePage = false;
  isAdmin = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.isProfilePage = this.router.url === '/profile';
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.authService.getUserProfile().pipe(
      catchError((err: any) => {
        console.error('Erro ao carregar perfil:', err);
        return of(null);
      })
    ).subscribe({
      next: (user: User | null) => {
        this.userProfile = user;
        // Verifica se o usuário é admin
        this.isAdmin = user?.role === 'admin';
      }
    });
  }

  getInitial(name: string | undefined | null): string {
    return name?.charAt(0).toUpperCase() ?? '?';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
