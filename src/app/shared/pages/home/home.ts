import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieCard } from '@shared/components/movie-card/movie-card';
import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { Footer } from '@shared/components/footer/footer';
import { RouterModule } from '@angular/router';
import { Navbar } from '@shared/components/navbar/navbar';
import { IMovie } from '@shared/interface/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, Navbar, MovieCard, ZardPaginationComponent, Footer, ListDialog],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  mediaItems: IMovie[] = [];
  tredndingItems: IMovie[] = [];
  pageNumber = 1;
  totalPages = 1;

  dialogOpen = false;
  selectedMedia: MediaPayload | null = null;
  timeRange = 'day';

  dialogOpen = false;
  selectedMedia: MediaPayload | null = null;
  timeRange = 'day';

  timeOptions: SegmentedControlOption[] = [
    { label: 'Today', value: 'day' },
    { label: 'This Week', value: 'week' },
  ];
  constructor(private moviesService: MoviesService) {}

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
