import { Component, ViewChild, ElementRef } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {Header} from '../../components/header/header';
import {CustonInput} from '../../components/custon-input/custon-input';
import {CustonButton} from '../../components/custon-button/custon-button';

@Component({
  selector: 'app-new-question',
  imports: [
    Header,
    CustonInput,
    CustonButton
  ],
  templateUrl: './new-question.html',
  styleUrl: './new-question.css',
  standalone: true
})
export class NewQuestion {
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;

  previewImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreview.nativeElement.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
}
