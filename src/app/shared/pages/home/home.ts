import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieCard } from '@shared/components/movie-card/movie-card';
import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { Footer } from '@shared/components/footer/footer';
import { IMovie, IMoviesResponse } from '@shared/interface/interfaces';
import {
  SegmentedControlOption,
  SegmentedControlComponent,
} from '@shared/components/switch/switch';
import { MoviesService } from '@shared/services/movies-service';
import { ListDialog } from '../list-dialog/list-dialog';
import { Carousel } from '@shared/components/carousel/carousel';
import { HeroSection } from '@shared/components/hero-section/hero-section';
export type MediaPayload = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number | null;
};
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterModule,MovieCard,ZardPaginationComponent, Footer, ListDialog, Carousel, SegmentedControlComponent, HeroSection,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  mediaItems: IMovie[] = [];
  tredndingItems: IMovie[] = [];
  languageService = inject(LanguageService);
  timeOptions = signal<SegmentedControlOption[]>([]);
  pageNumber = 1;
  totalPages = 1;

  dialogOpen = false;
  selectedMedia: MediaPayload | null = null;
  timeRange = 'day';

  constructor(private moviesService: MoviesService) {
    effect(() => {
      const lang = this.languageService.currentLanguage();
      this.timeOptions.set([
        { label: this.languageService.t('today'), value: 'day' },
        { label: this.languageService.t('thisWeek'), value: 'week' },
      ]);

      this.loadMovies(this.pageNumber);
      this.loadTrending();
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

  openAddToList(media: MediaPayload) {
    this.selectedMedia = media;
    this.dialogOpen = true;
  }

  closeDialog() {
    this.dialogOpen = false;
    this.selectedMedia = null;
  }
  onTimeRangeChange(value: string) {
    this.timeRange = value;
    this.loadTrending();
  }
}
