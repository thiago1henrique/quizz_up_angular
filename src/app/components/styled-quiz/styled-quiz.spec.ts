import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledQuiz } from './styled-quiz';

describe('StyledQuiz', () => {
  let component: StyledQuiz;
  let fixture: ComponentFixture<StyledQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyledQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyledQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
