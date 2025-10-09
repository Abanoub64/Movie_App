import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTV } from './on-tv';

describe('OnTV', () => {
  let component: OnTV;
  let fixture: ComponentFixture<OnTV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTV]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnTV);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
