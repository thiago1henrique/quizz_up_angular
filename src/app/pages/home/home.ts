import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ProfileService, UserProfile } from '../../services/ProfileService';
import { CardQuiz } from '../../components/card-quiz/card-quiz';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardQuiz
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
      this.profileService.getUserById(userId).subscribe(data => {
        this.userProfile = data;
      });
    }
  }

  // Função para pegar a inicial do nome
  getInitial(name: string | undefined | null): string {
    if (!name) {
      return '?';
    }
    return name.charAt(0).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}
