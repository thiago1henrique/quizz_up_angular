import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizz } from '../models/quizz.dto';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private apiUrl = 'http://localhost:3000/quizzes'; // Ajuste para sua API

  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this.apiUrl);
  }

  // ADICIONE ESTE MÉTODO
  getQuizById(id: number): Observable<Quizz> {
    return this.http.get<Quizz>(`${this.apiUrl}/${id}`);
  }

  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
