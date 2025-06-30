import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustonButton } from './custon-button';

describe('CustonButton', () => {
  let component: CustonButton;
  let fixture: ComponentFixture<CustonButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustonButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustonButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
