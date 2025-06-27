import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { QuestionsService } from '../../services/questions';
import { QuestionsService } from '../../services/questions';
import { Question } from '../../models/quizz.dto'; // Certifique-se de que o caminho está correto para o seu modelo Question
import { CommonModule } from '@angular/common'; // Importe CommonModule para *ngIf, *ngFor, etc.
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-styled-quiz',
  templateUrl: './styled-quiz.html',
  imports: [CommonModule, BrowserModule], // Importe CommonModule para *ngIf, *ngFor, etc.
  standalone: true, // Se você não está usando standalone: true, remova esta linha
  styleUrl: './styled-quiz.css'
})
export class StyledQuiz implements OnInit, OnDestroy { // Implemente OnDestroy para limpar o timer
  @Input() questions: Question[] = [];

  currentIndex = 0;
  selectedOption: string | null = null;
  score = 0;

  timer = 60;
  intervalId: any;

  get currentQuestion(): Question {
    // Certifique-se de que questions[this.currentIndex] não é undefined antes de retornar
    return this.questions[this.currentIndex];
  }

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute
  ) {}
    
  

  ngOnInit(): void {
    // Apenas uma implementação de ngOnInit
    this.route.paramMap.subscribe((params) => {
      const topic = params.get('topic');
      if (topic) {
        this.questionsService.getQuestionsByTopic(topic).subscribe((data: Question[]) => {
          this.questions = data;
          this.currentIndex = 0;
          this.selectedOption = null;
          this.score = 0;
          this.startTimer(); // Inicia o timer quando as perguntas são carregadas
        });
      }
    });
    // Se você tiver um resolver para as perguntas, você pode iniciar o timer aqui também,
    // ou na subscrição do route.data no construtor.
    // this.startTimer(); // Isso seria chamado se as perguntas já estivessem carregadas
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startTimer() {
    this.timer = 60;
    clearInterval(this.intervalId); // Limpa qualquer timer anterior
    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.autoNext();
      }
    }, 1000);
  }

  selectOption(option: string) {
    if (this.selectedOption) return; // Impede que o usuário selecione outra opção
    this.selectedOption = option;
    if (option === this.currentQuestion.correct) {
      this.score++;
    }
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selectedOption = null;
      this.startTimer(); // Reinicia o timer para a próxima pergunta
    } else {
      // Última pergunta, finalize o quiz
      this.endQuiz();
    }
  }

  autoNext() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selectedOption = null;
      this.startTimer(); // Reinicia o timer para a próxima pergunta
    } else {
      // Última pergunta, finalize o quiz
      this.endQuiz();
    }
  }

  // Método para finalizar o quiz
  endQuiz() {
    clearInterval(this.intervalId); // Para o timer
    alert(`Quiz finalizado! Sua pontuação: ${this.score}/${this.questions.length}`);
    // Adicione aqui a lógica para navegar para uma página de resultados, etc.
  }

   prev() {
     if (this.currentIndex > 0) {
       this.currentIndex--;
       this.selectedOption = null;
       this.startTimer();
     }
   }
}