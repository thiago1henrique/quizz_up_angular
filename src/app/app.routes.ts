import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import {Splashscreen} from './pages/splashscreen/splashscreen';


export const routes: Routes = [
  {
    path: '',
    component: Splashscreen,
    title: 'QuizzUp | Bem vindo',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login | QuizzUp'
  }
];
