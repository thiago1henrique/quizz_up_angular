import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, NgClass, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { QuizAttemptService } from '../../services/QuizAttemptService';
import { QuizAttempt } from '../../models/quiz-attempt.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Header } from '../../components/header/header';
import { User } from '../../models/user.model';
import { catchError, of, tap } from 'rxjs';

// Importações do Angular Material corrigidas:
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    Header
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  providers: [DatePipe]
})

export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  error: string | null = null;
  quizHistory: QuizAttempt[] = [];

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private quizAttemptService: QuizAttemptService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = 'Usuário não autenticado';
      this.isLoading = false;
      this.snackBar.open('Faça login para acessar seu perfil', 'Fechar', {duration: 3000});
      return;
    }

    this.authService.getUserProfile().pipe(
      tap(user => {
        if (!user) {
          throw new Error('Usuário não encontrado');
        }
        this.user = user;
        this.loadQuizHistory(parseInt(userId, 10));
      }),
      catchError(err => {
        console.error('Erro ao carregar perfil:', err);
        this.error = 'Falha ao carregar perfil. Tente novamente mais tarde.';
        return of(null);
      })
    ).subscribe();
  }

  private loadQuizHistory(userId: number): void {
    this.quizAttemptService.getUserHistory(userId).subscribe({
      next: (history) => {
        this.quizHistory = history;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar histórico:', err);
        this.error = 'Falha ao carregar histórico de quizzes.';
        this.isLoading = false;
        this.snackBar.open('Erro ao carregar histórico', 'Fechar', {duration: 3000});
      }
    });
  }

  get totalQuizzes(): number {
    return this.quizHistory.length;
  }

  get successRate(): number {
    if (this.quizHistory.length === 0) return 0;

    const totalScore = this.quizHistory.reduce((acc, quiz) => acc + quiz.score, 0);
    const totalQuestions = this.quizHistory.reduce((acc, quiz) => acc + quiz.totalQuestions, 0);
    return totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
  }

  getInitial(name: string | undefined): string {
    return name?.charAt(0).toUpperCase() || '?';
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isNaN(dateObj.getTime()) ? '' : this.datePipe.transform(dateObj, 'dd/MM/yyyy') || '';
  }

  getPercentage(quiz: QuizAttempt): number {
    return Math.round((quiz.score / quiz.totalQuestions) * 100);
  }

  getBadgeClass(quiz: QuizAttempt): string {
    if (quiz.score === quiz.totalQuestions) return 'badge-perfect';
    if (quiz.score >= quiz.totalQuestions * 0.7) return 'badge-good';
    return 'badge-practice';
  }

  getBadgeText(quiz: QuizAttempt): string {
    if (quiz.score === quiz.totalQuestions) return 'Perfeito!';
    if (quiz.score >= quiz.totalQuestions * 0.7) return 'Bom trabalho';
    return 'Continue praticando';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  refreshProfile(): void {
    this.isLoading = true;
    this.error = null;
    this.authService.refreshUserProfile().subscribe({
      next: (user) => {
        this.user = user;
        const userId = this.authService.getUserId();
        if (userId) {
          this.loadQuizHistory(parseInt(userId, 10));
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
        this.error = 'Falha ao atualizar perfil. Tente novamente.';
        this.isLoading = false;
      }
    });
  }
}
