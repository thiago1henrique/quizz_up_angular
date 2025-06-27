import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { Splashscreen } from './pages/splashscreen/splashscreen';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'quizz_up';
}
