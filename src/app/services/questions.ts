// services/quizz.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/quizz.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuestionsByTopic(topic: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.API_URL}/questions?topic=${topic}`);
  }

  getAllTopics(): Observable<string[]> {
    return this.http.get<Question[]>(`${this.API_URL}/questions`).pipe(
      map((questions) => [...new Set(questions.map(q => q.topic))])
    );
  }
}
