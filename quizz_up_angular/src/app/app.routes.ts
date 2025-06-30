import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import {Splashscreen} from './pages/splashscreen/splashscreen';
import {Cadastro} from './pages/cadastro/cadastro';
import {HomeComponent} from './pages/home/home';
import {ProfileComponent } from './pages/profile/profile';
import {NewQuestion} from './pages/new-question/new-question';
import {authGuard} from './guards/auth-guard';
import {QuizComponent} from './pages/quiz/quiz';


export const routes: Routes = [
  {
    path: '',
    component: Splashscreen,
    title: 'QuizzUp | Bem vindo',
  },
  {
    path: 'cadastro',
    component: Cadastro,
    title: 'Cadastro | QuizzUp'
  },
  {
    path: 'login',
    component: Login,
    title: 'Login | QuizzUp'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home | QuizzUp',
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'profile | QuizzUp',
    canActivate: [authGuard]
  },
  {
    path: 'newQuestion',
    component: NewQuestion,
    title: 'newQuestion | QuizzUp',
    canActivate: [authGuard]
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
    title: 'Quiz | QuizzUp',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
