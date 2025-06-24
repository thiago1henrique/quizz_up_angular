import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustonButton } from '../../components/custon-button/custon-button';
import { CustonInput } from '../../components/custon-input/custon-input';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { User } from '../../models/user.interface';

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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // A única validação que mantemos é que os campos não podem ser vazios.
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Se o usuário clicar com os campos vazios, podemos dar um feedback.
    if (this.loginForm.invalid) {
      this.loginError = 'Por favor, preencha seu email e senha.';
      return;
    }
    this.loginError = null;

    const { email, senha } = this.loginForm.value;

    this.userService.getUsers().subscribe({
      next: (users) => {
        const user = users.find(u => u.email === email && u.password === senha);

        if (user && user.id) { // Se o usuário existir e tiver um ID
          // SUCESSO!
          this.authService.login(user.id);
          this.router.navigate(['/home']);
        } else {
          // FALHA!
          this.loginError = 'Email ou senha inválidos.';
        }
      },
      error: (err) => {
        this.loginError = 'Erro de conexão com o servidor.';
      }
    });
  }
}
