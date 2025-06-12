import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustonInput } from './custon-input';

describe('CustonInput', () => {
  let component: CustonInput;
  let fixture: ComponentFixture<CustonInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustonInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustonInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
