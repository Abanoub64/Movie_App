import { Component, effect, inject, OnInit } from '@angular/core';
import { MovieCard } from '@shared/components/movie-card/movie-card';
import { IMovie, IMoviesResponse } from '@shared/interface/interfaces';
import { MoviesService } from '@shared/services/movies-service';
import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { Footer } from '@shared/components/footer/footer';
import { RouterModule } from '@angular/router';
import {
  SegmentedControlOption,
  SegmentedControlComponent,
} from '@shared/components/switch/switch';
import { Carousel } from '@shared/components/carousel/carousel';
import { HeroSection } from '@shared/components/hero-section/hero-section';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MovieCard,
    ZardPaginationComponent,
    Footer,
    RouterModule,
    SegmentedControlComponent,
    Carousel,
    HeroSection,
    SearchBar,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  mediaItems: IMovie[] = [];
  tredndingItems: IMovie[] = [];
  pageNumber = 1;
  totalPages = 1;
  timeRange = 'day';

  timeOptions: SegmentedControlOption[] = [
    { label: 'Today', value: 'day' },
    { label: 'This Week', value: 'week' },
  ];
  private languageService = inject(LanguageService);
  constructor(private moviesService: MoviesService) {
    effect(() => {
      const lang = this.currentLanguage();
      this.loadMovies(this.pageNumber);
    });
  }
  currentLanguage = this.languageService.currentLanguage;
  ngOnInit(): void {
    this.loadMovies(this.pageNumber);
    this.loadTrending();
  }

  loadMovies(page: number) {
    this.moviesService.getpopular(page).subscribe({
      next: (res: IMoviesResponse) => {
        this.mediaItems = res.results;
        this.totalPages = res.total_pages;
        this.pageNumber = page;
      },
      error: (err) => console.error('Error loading movies', err),
    });
  }
  loadTrending() {
    this.moviesService.getTrending(this.timeRange).subscribe({
      next: (res: IMoviesResponse) => {
        this.tredndingItems = res.results;
      },
      error: (err) => console.error('Error loading movies', err),
    });
  }

  onPageChange(newPage: number) {
    this.loadMovies(newPage);
  }
  onTimeRangeChange(value: string) {
    this.timeRange = value;
    this.loadTrending();
  }
}
