import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingMovies } from './up-coming-movies';

describe('UpComingMovies', () => {
  let component: UpComingMovies;
  let fixture: ComponentFixture<UpComingMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpComingMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpComingMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
