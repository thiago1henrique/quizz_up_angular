import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-custon-input',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatProgressSpinnerModule ],
  templateUrl: './custon-input.html',
  styleUrl: './custon-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustonInput),
      multi: true
    }
  ]
})
export class CustonInput implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() error: string = '';

  value: any = '';
  isDisabled: boolean = false;

  onChange(value: any) {
    this.value = value;
    console.log("onChange", value);
  }

  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
