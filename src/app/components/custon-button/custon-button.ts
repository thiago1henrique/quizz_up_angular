import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importe o módulo

@Component({
  selector: 'app-custon-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatProgressSpinnerModule // Adicione o módulo aqui
  ],
  templateUrl: './custon-button.html',
  styleUrls: ['./custon-button.css']
})
export class CustonButton {
  @Input() texto: string = "Botão";
  @Input() rota: string | null = null;
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
}
