import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { Footer } from '@shared/components/footer/footer';
import { ListDialog } from '@shared/pages/list-dialog/list-dialog';
import { MediaPayload } from '@shared/pages/home/home';
import { IMovie, IMoviesResponse } from '@shared/interface/interfaces';
import { MoviesService } from '@shared/services/movies-service';
import { SegmentedControlOption } from '@shared/components/switch/switch';
import { LanguageService } from '@shared/services/language-service';
import { TvServices } from '@shared/services/tv-services';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MovieCard } from '@shared/components/movie-card/movie-card';
@Component({
  selector: 'app-top-rated-tv',
  imports: [ZardPaginationComponent, ListDialog, MovieCard],
  templateUrl: './top-rated-tv.html',
  styleUrl: './top-rated-tv.css',
})
export class TopRatedTV implements OnInit {
  mediaItems: IMovie[] = [];
  tredndingItems: IMovie[] = [];
  languageService = inject(LanguageService);
  timeOptions = signal<SegmentedControlOption[]>([]);
  pageNumber = 1;
  totalPages = 1;

  dialogOpen = false;
  selectedMedia: MediaPayload | null = null;
  timeRange = 'day';

  constructor(private tvservices: TvServices) {
    effect(() => {
      const lang = this.languageService.currentLanguage();

      this.loadMovies(this.pageNumber);
    });
  }
  currentLanguage = this.languageService.currentLanguage;
  ngOnInit(): void {
    this.loadMovies(this.pageNumber);
  }

  loadMovies(page: number) {
    this.tvservices.gettop_ratedMovies(page).subscribe({
      next: (res: IMoviesResponse) => {
        this.mediaItems = res.results;
        this.totalPages = res.total_pages;
        this.pageNumber = page;
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
}
