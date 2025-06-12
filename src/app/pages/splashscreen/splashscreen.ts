import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustonButton} from '../../components/custon-button/custon-button';

@Component({
  selector: 'app-splashscreen',
  imports: [RouterOutlet, CustonButton],
  templateUrl: './splashscreen.html',
  styleUrl: './splashscreen.css'
})
export class Splashscreen {

}
