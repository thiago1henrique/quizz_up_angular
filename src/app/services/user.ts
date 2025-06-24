import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // A URL agora aponta diretamente para a lista de perfis
  private apiUrl = "http://localhost:3000/profile";

  constructor(private http: HttpClient) {}

  /**
   * Busca a lista completa de usuários.
   * Usado na tela de Login para validar as credenciais.
   * Este método agora busca corretamente de /profile
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Busca um usuário específico pelo ID.
   * Usado na tela Home.
   */
  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria um novo usuário.
   * Usado na tela de Cadastro.
   * Este método agora envia (POST) corretamente para /profile
   */
  public createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
