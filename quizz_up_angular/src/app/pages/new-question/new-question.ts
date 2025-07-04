import {Component, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizzService } from '../../services/quizz';
import { Header } from '../../components/header/header';
import { CustonInput } from '../../components/custon-input/custon-input';
import { CustonButton } from '../../components/custon-button/custon-button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import {Quizz} from '../../models/quizz.dto';

@Component({
  selector: 'app-new-question',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header,
    CustonInput,
    CustonButton
  ],
  templateUrl: './new-question.html',
  styleUrl: './new-question.css'
})
export class NewQuestion {
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  currentQuestion = 0;
  totalQuestions = 5;
  showErrors = false;
  isLoading = false;

  // Dados principais do quiz
  quizData: Partial<Quizz> = {
    title: '',
    description: '',
    logo: '',
    id: undefined
  };

  // Dados das questões - agora separados do quizData principal
  questions: any[] = Array(this.totalQuestions).fill(null).map((_, i) => ({
    id: i,
    title: '',
    alternatives: Array(4).fill(null).map((_, j) => ({
      id: `${i}-${j}`,
      text: '',
      isCorrect: false
    }))
  }));

  constructor(
    private router: Router,
    private quizzService: QuizzService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.quizzService.getQuizById(params['id']).subscribe({
          next: (quiz) => {
            this.quizData = quiz;
            this.questions = quiz.questions;
            this.currentQuestion = 0;
            this.changeDetectorRef.detectChanges();
          },
          error: (err) => {}
        })
      }
    })
  }

  previewImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.nativeElement.src = e.target.result;
        this.quizData.logo = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  setCorrectAnswer(questionIndex: number, altIndex: number) {
    this.questions[questionIndex].alternatives.forEach((alt: any, i: number) => {
      alt.isCorrect = (i === altIndex);
    });
  }

  validateCurrentQuestion(): boolean {
    this.showErrors = false;

    if (this.currentQuestion === 0) {
      const isValid = !!this.quizData.title?.trim() &&
        !!this.quizData.description?.trim() &&
        !!this.quizData.logo;
      this.showErrors = !isValid;
      return isValid;
    }

    const questionIndex = this.currentQuestion - 1;
    const question = this.questions[questionIndex];

    if (!question) {
      this.showErrors = true;
      return false;
    }

    const isTitleValid = !!question.title?.trim();
    const areAlternativesValid = question.alternatives.every((alt: any) => !!alt.text?.trim());
    const hasCorrectAnswer = question.alternatives.some((alt: any) => alt.isCorrect);

    this.showErrors = !isTitleValid || !areAlternativesValid || !hasCorrectAnswer;
    return isTitleValid && areAlternativesValid && hasCorrectAnswer;
  }

  nextQuestion() {
    if (!this.validateCurrentQuestion()) {
      alert('Preencha todos os campos obrigatórios antes de avançar');
      return;
    }

    if (this.currentQuestion <= this.totalQuestions) {
      this.currentQuestion++;
    }

    this.showErrors = false;
    this.changeDetectorRef.detectChanges();
    console.log(this.questions);
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      // Clear the current question's data when moving back
      const currentQuestionIndex = this.currentQuestion - 1;
      if (currentQuestionIndex >= 0 && currentQuestionIndex < this.questions.length) {
        this.questions[currentQuestionIndex].title = '';
        this.questions[currentQuestionIndex].alternatives.forEach((alt: any) => {
          alt.text = '';
          alt.isCorrect = false;
        });
      }

      this.currentQuestion--;
      this.showErrors = false;
    }
  }

  async submitQuiz() {
    if (!this.validateCurrentQuestion()) {
      alert('Preencha todos os campos obrigatórios antes de finalizar');
      return;
    }

    this.isLoading = true;

    try {
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Usuário não autenticado');
      }

      const formData = new FormData();
      formData.append('title', this.quizData.title!.trim());
      formData.append('description', this.quizData.description!.trim());

      const questionsToSend = this.questions.map(q => ({
        title: q.title.trim(),
        alternatives: q.alternatives.map((a: any) => ({
          text: a.text.trim(),
          isCorrect: a.isCorrect
        }))
      }));

      formData.append('questions', JSON.stringify(questionsToSend));

      if (this.quizData.logo!.startsWith('data:')) {
        const logoFile = await this.dataURLtoFile(this.quizData.logo!, 'quiz-logo.png');
        formData.append('logo', logoFile);
      }

      if (this.quizData.id) {
        formData.append('id', this.quizData.id.toString());
        this.quizzService.updateQuiz(this.quizData.id, formData).subscribe({
          next: () => {
            alert('Quiz atualizado com sucesso!');
            this.resetForm();
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro ao atualizar quiz:', err);
            let errorMessage = 'Erro ao atualizar quiz. Tente novamente.';
            if (err.status === 401) {
              errorMessage = 'Sessão expirada. Faça login novamente.';
              this.authService.logout();
            }
            alert(errorMessage);
          },
          complete: () => {
            this.isLoading = false;
          }
        })

        return
      }

      this.quizzService.createQuiz(formData, token).subscribe({
        next: () => {
          alert('Quiz criado com sucesso!');
          this.resetForm();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao criar quiz:', err);
          let errorMessage = 'Erro ao criar quiz. Tente novamente.';
          if (err.status === 401) {
            errorMessage = 'Sessão expirada. Faça login novamente.';
            this.authService.logout();
          }
          alert(errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Erro ao processar quiz:', error);
      alert('Ocorreu um erro ao processar o quiz.');
      this.isLoading = false;
    }
  }

  private dataURLtoFile(dataurl: string, filename: string): Promise<File> {
    return new Promise((resolve) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      resolve(new File([u8arr], filename, { type: mime }));
    });
  }

  private resetForm() {
    this.quizData = {
      title: '',
      description: '',
      logo: '',
    };

    this.questions = Array(this.totalQuestions).fill(null).map((_, i) => ({
      id: i,
      title: '',
      alternatives: Array(4).fill(null).map((_, j) => ({
        id: `${i}-${j}`,
        text: '',
        isCorrect: false
      }))
    }));

    this.currentQuestion = 1;
    this.showErrors = false;
    this.isLoading = false;

    if (this.imagePreview?.nativeElement) {
      this.imagePreview.nativeElement.src = '#';
    }
  }
}
