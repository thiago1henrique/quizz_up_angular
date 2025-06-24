import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Quizz } from '../models/quizz.dto';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private readonly API_URL = "http://localhost:3000/quizzers";

  constructor(private http: HttpClient) {}

  /**
   * Obtém todos os quizzes
   * @returns Observable com array de Quizz
   */
  getAllQuizzes(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtém um quiz específico por ID
   * @param id ID do quiz
   * @returns Observable com o Quizz
   */
  getQuizById(id: number): Observable<Quizz> {
    return this.http.get<Quizz>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Cria um novo quiz
   * @param quiz Dados do quiz (sem ID)
   * @returns Observable com o Quizz criado
   */
  createQuiz(quiz: Omit<Quizz, 'id'>): Observable<Quizz> {
    return this.http.post<Quizz>(this.API_URL, quiz).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Atualiza um quiz existente
   * @param quiz Quiz completo com ID
   * @returns Observable com o Quizz atualizado
   */
  updateQuiz(quiz: Quizz): Observable<Quizz> {
    return this.http.put<Quizz>(`${this.API_URL}/${quiz.id}`, quiz).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Remove um quiz
   * @param id ID do quiz a ser removido
   * @returns Observable vazio
   */
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Tratamento genérico de erros
   * @param error Erro ocorrido
   * @returns Observable com erro
   */
  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Erro ao processar operação. Tente novamente.'));
  }
}
