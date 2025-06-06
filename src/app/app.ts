import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Splashscreen } from './pages/splashscreen/splashscreen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Splashscreen],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'quizz_up';
}
