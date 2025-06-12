import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe para usar *ngFor
import { QuizzService } from '../../services/quizz';
import { Quizz } from '../../models/quizz.dto'; // Importe a interface

@Component({
  selector: 'app-card-quiz',
  standalone: true,
  imports: [CommonModule], // Adicione CommonModule
  templateUrl: './card-quiz.html',
  styleUrl: './card-quiz.css'
})
export class CardQuiz implements OnInit {

  // Propriedade para guardar a lista de quizzes que virá da API
  public quizzes: Quizz[] = [];

  constructor(private quizzService: QuizzService) {}

  ngOnInit(): void {
    // Chama o serviço para buscar os dados
    this.quizzService.getQuizzes().subscribe(data => {
      this.quizzes = data; // Armazena a lista na propriedade do componente
    });
  }
}
