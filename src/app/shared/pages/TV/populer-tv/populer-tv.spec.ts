import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulerTV } from './populer-tv';

describe('PopulerTV', () => {
  let component: PopulerTV;
  let fixture: ComponentFixture<PopulerTV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulerTV]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulerTV);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
