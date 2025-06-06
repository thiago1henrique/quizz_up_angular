import { Component } from '@angular/core';
import { Input } from '../../components/input/input'
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  imports: [Input, RouterOutlet],
  templateUrl: './splashscreen.html',
  styleUrl: './splashscreen.css'
})
export class Splashscreen {

}
