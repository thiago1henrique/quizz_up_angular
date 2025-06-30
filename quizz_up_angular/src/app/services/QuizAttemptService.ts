import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { QuizAttempt } from '../models/quiz-attempt.dto';

@Injectable({
  providedIn: 'root'
})
export class QuizAttemptService {
  private readonly API_URL = "http://localhost:3000/quiz-attempts";

  constructor(private http: HttpClient) {}

  createAttempt(attempt: QuizAttempt): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(this.API_URL, attempt).pipe(
      catchError(this.handleError)
    );
  }

  getUserHistory(userId: number): Observable<QuizAttempt[]> {
    return this.http.get<QuizAttempt[]>(`${this.API_URL}/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    throw new Error('Erro ao processar operação. Tente novamente.');
  }
}
