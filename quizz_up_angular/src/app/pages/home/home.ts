import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth';
import { CardQuiz } from '../../components/card-quiz/card-quiz';
import {Header} from '../../components/header/header';
import {ProfileService} from '../../services/ProfileService';

class UserProfile {
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardQuiz,
    Header
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId) {
      this.profileService.getUserById(userId).subscribe({
        next: (data) => this.userProfile = data,
        error: (err) => console.error('Erro ao carregar perfil:', err)
      });
    }
  }

  getInitial(name: string | undefined | null): string {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
