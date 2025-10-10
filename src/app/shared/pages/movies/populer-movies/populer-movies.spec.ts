import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulerMovies } from './populer-movies';

describe('PopulerMovies', () => {
  let component: PopulerMovies;
  let fixture: ComponentFixture<PopulerMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulerMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulerMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
