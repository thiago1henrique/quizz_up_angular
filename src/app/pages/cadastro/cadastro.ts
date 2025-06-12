import { Component } from '@angular/core';
import {CustonButton} from '../../components/custon-button/custon-button';
import {CustonInput} from '../../components/custon-input/custon-input';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    CustonButton,
    CustonInput,
    RouterLink
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

}
