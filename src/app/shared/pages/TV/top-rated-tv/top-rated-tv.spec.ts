import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedTV } from './top-rated-tv';

describe('TopRatedTV', () => {
  let component: TopRatedTV;
  let fixture: ComponentFixture<TopRatedTV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedTV]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedTV);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
