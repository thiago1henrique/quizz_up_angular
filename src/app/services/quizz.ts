import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizz } from '../models/quizz.dto'; // Importe a interface

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private apiUrl = "http://localhost:3000/quizzers";

  constructor(private http: HttpClient) {}

  // Método que busca a lista de quizzes
  public getQuizzes(): Observable<Quizz[]> {
    // A resposta da API já é um array de Quizz, então não precisamos do 'map' aqui
    return this.http.get<Quizz[]>(this.apiUrl);
  }
}
