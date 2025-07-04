import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzService } from '../../services/quizz';
import { Quizz } from '../../models/quizz.dto';
import { AuthService } from '../../services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './card-quiz.html',
  styleUrls: ['./card-quiz.css']
})
export class CardQuiz implements OnInit {
  quizzes: Quizz[] = [];
  isAdmin = false;
  deletingIds = new Set<number>();
  loading = true;

  constructor(
    private quizzService: QuizzService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.loadQuizzes();
  }

  private checkAdminStatus(): void {
    this.authService.isAdmin().subscribe({
      next: (isAdmin) => this.isAdmin = isAdmin,
      error: (err) => console.error('Erro ao verificar admin:', err)
    });
  }

  private loadQuizzes(): void {
    this.quizzService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar quizzes:', err);
        this.loading = false;
      }
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
          alert('Erro ao excluir quiz');
        }
      });
    }
  }

  startQuiz(quizId: number): void {
    this.router.navigate(['/quiz', quizId]);
  }

  editQuiz(quizId: number): void {
    this.router.navigate(['/newQuestion', quizId], {
      state: { editMode: true }
    });
  }

  isDeleting(quizId: number): boolean {
    return this.deletingIds.has(quizId);
  }
}
