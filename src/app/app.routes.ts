import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import {Splashscreen} from './pages/splashscreen/splashscreen';
import {Cadastro} from './pages/cadastro/cadastro';
import {HomeComponent} from './pages/home/home';
import {authGuard} from './guards/auth-guard';


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
  
];
