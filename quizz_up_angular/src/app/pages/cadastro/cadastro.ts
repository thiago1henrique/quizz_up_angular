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
      this.marcarFormularioComoTocado();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const email = this.cadastroForm.value.email;

    this.http.get<any>(`http://localhost:3000/users/email/${email}`)
      .subscribe({
        next: (resposta) => {
          if (resposta.existe) {
            this.loading = false;
            this.errorMessage = 'Este e-mail já está cadastrado.';
            return;
          }

          // Criar novo usuário no endpoint correto
          this.criarNovoUsuario();
        },
        error: (erro) => {
          this.loading = false;
          console.error('Erro ao verificar e-mail:', erro);
          // Tratar 404 como "email disponível"
          if (erro.status === 404) {
            this.criarNovoUsuario();
          } else {
            this.errorMessage = 'Erro ao verificar e-mail. Tente novamente.';
          }
        }
      });
  }

private criarNovoUsuario() {
    this.http.post<any>('http://localhost:3000/users', this.cadastroForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (erro) => {
          this.loading = false;
          console.error('Erro no cadastro:', erro);
          this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
        }
      });
  }

  private marcarFormularioComoTocado() {
    Object.values(this.cadastroForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
