import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf
import { RouterLink } from '@angular/router';     // Necessário para a tag <a> com [routerLink]
import { MatButtonModule } from '@angular/material/button'; // Necessário para a diretiva mat-button

@Component({
  selector: 'app-custon-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule // <-- TENHO QUASE CERTEZA QUE ESTE ESTAVA FALTANDO
  ],
  templateUrl: './custon-button.html',
  styleUrls: ['./custon-button.css']
})
export class CustonButton {
  @Input() texto: string = "Botão";
  @Input() rota: string | null = null;
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
}
