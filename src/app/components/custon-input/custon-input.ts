import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-custon-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './custon-input.html',
  styleUrl: './custon-input.css'
})
export class CustonInput {
  @Input() type: string = 'email';
  @Input() placeholder: string = '';
  @Input() label: string = '';
}
