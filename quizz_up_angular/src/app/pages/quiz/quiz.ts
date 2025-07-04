import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from '../../services/quizz';
import { Quizz } from '../../models/quizz.dto';
import { AuthService } from '../../services/auth';
import { QuizAttemptService } from '../../services/QuizAttemptService';
import { QuizAttempt } from '../../models/quiz-attempt.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {CreateQuizAttemptDto} from '../../models/create-quiz-attempt.dto';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'] // Mantendo seu CSS existente
})
export class QuizComponent implements OnInit {
  quizId!: number;
  quiz: Quizz | null = null;
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  score = 0;
  showResults = false;
  userId: number | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizzService: QuizzService,
    private authService: AuthService,
    private quizAttemptService: QuizAttemptService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.quizId = idParam ? +idParam : 0;
    this.verifyAuthentication();
    this.loadQuiz();
  }

  private verifyAuthentication(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.snackBar.open('Você precisa estar logado para salvar seu resultado.', 'Fechar', {
        duration: 5000
      });
      this.router.navigate(['/login']);
      return;
    }

    this.userId = parseInt(userId, 10);

    if (isNaN(this.userId)) {
      console.error('ID de usuário inválido:', userId);
      this.snackBar.open('Erro na autenticação. Faça login novamente.', 'Fechar', {
        duration: 5000
      });
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  loadQuiz(): void {
    this.quizzService.getQuizById(this.quizId).subscribe({
      next: (quiz) => {
        this.quiz = quiz;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar quiz:', err);
        this.error = 'Erro ao carregar o quiz. Tente novamente.';
        this.isLoading = false;
        this.snackBar.open(this.error, 'Fechar', {duration: 5000});
      }
    });
  }

  get currentQuestion(): any {
    if (!this.quiz || !this.quiz.questions) return null;
    return this.quiz.questions[this.currentQuestionIndex];
  }

  selectAnswer(index: number): void {
    this.selectedAnswer = index;
  }

  nextQuestion(): void {
    if (this.selectedAnswer === null) {
      this.snackBar.open('Selecione uma resposta antes de continuar', 'Fechar', {
        duration: 3000
      });
      return;
    }

    const currentQuestion = this.currentQuestion;
    if (currentQuestion && this.selectedAnswer !== null) {
      const isCorrect = currentQuestion.alternatives[this.selectedAnswer].isCorrect;
      if (isCorrect) {
        this.score++;
      }
    }

    if (this.quiz && this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
    } else {
      this.showResults = true;
      this.saveQuizAttempt();
    }
  }

  saveQuizAttempt(): void {
    if (!this.userId || !this.quiz) {
      this.snackBar.open('Você precisa estar logado para salvar seu resultado.', 'Fechar', {
        duration: 5000
      });
      this.router.navigate(['/login']);
      return;
    }

    const attempt: CreateQuizAttemptDto = {
      userId: this.userId,
      quizId: this.quizId,
      score: this.score,
      totalQuestions: this.quiz.questions.length,
    };

    this.quizAttemptService.createAttempt(attempt).subscribe({
      next: () => {
        this.snackBar.open('Tentativa salva com sucesso!', 'Fechar', {
          duration: 3000
        });
      },
      error: (err) => {
        console.error('Erro ao salvar tentativa:', err);
        this.snackBar.open('Erro ao salvar tentativa. Tente novamente.', 'Fechar', {
          duration: 5000
        });
      }
    });
  }

  getBadgeClass(): string {
    if (!this.quiz) return 'badge-practice';

    if (this.score === this.quiz.questions.length) return 'badge-perfect';
    if (this.score >= this.quiz.questions.length * 0.7) return 'badge-good';
    return 'badge-practice';
  }

  getBadgeText(): string {
    if (!this.quiz) return 'Continue praticando';

    if (this.score === this.quiz.questions.length) return 'Perfeito!';
    if (this.score >= this.quiz.questions.length * 0.7) return 'Bom trabalho';
    return 'Continue praticando';
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.showResults = false;
  }

  goToHome(): void {
    this.router.navigate(['/home']).then(success => {
      if (!success) {
        console.error('Falha ao navegar para /home');
        this.snackBar.open('Erro de navegação. Tente novamente.', 'Fechar', {duration: 3000});
      }
    });
  }
}
