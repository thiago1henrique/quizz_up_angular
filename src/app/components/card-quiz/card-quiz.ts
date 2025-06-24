import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzService } from '../../services/quizz';
import { Quizz } from '../../models/quizz.dto';
import { AuthService } from '../../services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-card-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './card-quiz.html',
  styleUrl: './card-quiz.css'
})
export class CardQuiz implements OnInit {
  quizzes: Quizz[] = [];
  isAdmin = false;
  deletingIds = new Set<number>();

  constructor(
    private quizzService: QuizzService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.loadQuizzes();
  }

  private checkAdminStatus(): void {
    this.authService.isAdmin().subscribe({
      next: (isAdmin) => this.isAdmin = isAdmin,
      error: (err) => console.error('Erro ao verificar status de admin:', err)
    });
  }

  private loadQuizzes(): void {
    this.quizzService.getAllQuizzes().subscribe({
      next: (data) => this.quizzes = data,
      error: (err) => console.error('Erro ao carregar quizzes:', err)
    });
  }

  deleteQuiz(quizId: number): void {
    if (confirm('Tem certeza que deseja excluir este quiz?')) {
      this.deletingIds.add(quizId);
      this.quizzService.deleteQuiz(quizId).subscribe({
        next: () => {
          this.quizzes = this.quizzes.filter(q => q.id !== quizId);
          this.deletingIds.delete(quizId);
        },
        error: (err) => {
          console.error('Erro ao excluir quiz:', err);
          this.deletingIds.delete(quizId);
          alert('Erro ao excluir quiz. Tente novamente.');
        }
      });
    }
  }

  isDeleting(quizId: number): boolean {
    return this.deletingIds.has(quizId);
  }
}
