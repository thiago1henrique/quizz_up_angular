import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import {Splashscreen} from './pages/splashscreen/splashscreen';
import {Cadastro} from './pages/cadastro/cadastro';
import {Home} from './pages/home/home';


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
    component: Home,
    title: 'Home | QuizzUp'
  },

];
