import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

export interface UserProfile {
  id?: string;
  userProfile: string; // O link da imagem que queremos
  name?: string;
}

export interface ProfileResponse {
  profile: UserProfile[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = "http://localhost:3000/profile";
  constructor(private http: HttpClient) {}

  public getProfileData(): Observable<UserProfile> {
    // 1. Agora esperamos receber um ARRAY de UserProfile: UserProfile[]
    return this.http.get<UserProfile[]>(this.apiUrl).pipe(
      // 2. Acessamos diretamente o primeiro item do array de resposta
      map(response => response[0])
    );
  }
}
