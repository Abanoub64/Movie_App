import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithMenu } from './button-with-menu';

describe('ButtonWithMenu', () => {
  let component: ButtonWithMenu;
  let fixture: ComponentFixture<ButtonWithMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWithMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonWithMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
