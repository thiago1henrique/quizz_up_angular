import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuiz } from './card-quiz';

describe('CardQuiz', () => {
  let component: CardQuiz;
  let fixture: ComponentFixture<CardQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
