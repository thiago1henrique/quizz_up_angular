import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustonButton } from '../../components/custon-button/custon-button';
import { CustonInput } from '../../components/custon-input/custon-input';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    CustonButton, CustonInput
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginError = 'Por favor, preencha seu email e senha.';
      return;
    }

    const { email, senha } = this.loginForm.value;

    this.authService.loginWithCredentials(email, senha).subscribe({
      next: (res) => {
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loginError = 'Email ou senha inválidos.';
      }
    });
  }
}
