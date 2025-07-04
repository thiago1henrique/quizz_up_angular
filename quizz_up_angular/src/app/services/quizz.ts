import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizz } from '../models/quizz.dto';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private apiUrl = 'http://localhost:3000/quizzes';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createQuiz(formData: FormData, token: string): Observable<Quizz> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Quizz>(this.apiUrl, formData, { headers });
  }

  updateQuiz(id: number, formData: FormData): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  getAllQuizzes(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getQuizById(id: number): Observable<Quizz> {
    return this.http.get<Quizz>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
