import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSec } from './button-sec';

describe('ButtonSec', () => {
  let component: ButtonSec;
  let fixture: ComponentFixture<ButtonSec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSec]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSec);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
