import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-custon-button',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterLink],
  templateUrl: './custon-button.html',
  styleUrl: './custon-button.css'
})
export class CustonButton {
  @Input() texto: string = "custon button";
  @Input() rota: string = "/"
}
