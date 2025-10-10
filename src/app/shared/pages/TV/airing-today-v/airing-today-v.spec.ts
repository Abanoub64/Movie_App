import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiringTodayV } from './airing-today-v';

describe('AiringTodayV', () => {
  let component: AiringTodayV;
  let fixture: ComponentFixture<AiringTodayV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiringTodayV]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiringTodayV);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
