import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustonButton} from '../../components/custon-button/custon-button';
import {CustonInput} from '../../components/custon-input/custon-input';

@Component({
  selector: 'app-login',
  imports: [
    RouterOutlet,
    CustonButton,
    CustonInput
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
