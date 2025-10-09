import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieCard } from '@shared/components/movie-card/movie-card';
import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { Footer } from '@shared/components/footer/footer';
import { Navbar } from '@shared/components/navbar/navbar';

import { IMovie, IMoviesResponse } from '@shared/interface/interfaces';
import { MoviesService } from '@shared/services/movies-service';
import { ListDialog } from '../list-dialog/list-dialog';

// مهم: علشان <app-list-dialog> يشتغل

type MediaPayload = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number | null;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    Navbar,
    MovieCard,
    ZardPaginationComponent,
    Footer,
    ListDialog, 
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  mediaItems: IMovie[] = [];
  pageNumber = 1;
  totalPages = 1;

  dialogOpen = false;
  selectedMedia: MediaPayload | null = null;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies(this.pageNumber);
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
