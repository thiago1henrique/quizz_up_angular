import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProfileService, UserProfile} from '../../services/ProfileService';
import {CardQuiz} from '../../components/card-quiz/card-quiz';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink, CommonModule, CardQuiz
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  userProfile: UserProfile | null = null;

  constructor(private profileService: ProfileService) {}

  // ngOnInit é o lugar perfeito para buscar dados iniciais
  ngOnInit(): void {
    this.profileService.getProfileData().subscribe(data => {
      // Quando os dados chegarem, armazenamos na nossa propriedade
      this.userProfile = data;
    });
  }
}
