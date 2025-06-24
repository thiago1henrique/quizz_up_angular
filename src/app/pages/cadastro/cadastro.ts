import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustonButton } from '../../components/custon-button/custon-button';
import { CustonInput } from '../../components/custon-input/custon-input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CustonButton,
    CustonInput,
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  cadastroForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.cadastroForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const email = this.cadastroForm.value.email;

    // Primeiro verifica se o email já existe
    this.http.get<any[]>(`http://localhost:3000/profile?email=${email}`).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.loading = false;
          this.errorMessage = 'Este e-mail já está cadastrado.';
          return;
        }

        // Se o email não existe, cria o novo usuário
        this.createNewUser();
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro ao verificar e-mail:', err);
        this.errorMessage = 'Erro ao verificar e-mail. Tente novamente.';
      }
    });
  }

  private createNewUser() {
    const newUser = {
      ...this.cadastroForm.value,
      userProfile: 'https://via.placeholder.com/150',
      id: this.generateId() // Gerar um ID único
    };

    this.http.post<any>('http://localhost:3000/profile', newUser).subscribe({
      next: () => {
        this.loading = false;
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro no cadastro:', err);
        this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
      }
    });
  }

  private generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }

  private markFormAsTouched() {
    Object.values(this.cadastroForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
