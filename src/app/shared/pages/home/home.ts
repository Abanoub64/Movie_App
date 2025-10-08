import { Component, OnInit } from '@angular/core';
import { MovieCard } from '@shared/components/movie-card/movie-card';
import { IMovie, IMoviesResponse } from '@shared/interface/interfaces';
import { MoviesService } from '@shared/services/movies-service';
import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { Footer } from '@shared/components/footer/footer';
import { RouterModule } from '@angular/router';
import { Navbar } from "@shared/components/navbar/navbar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard, ZardPaginationComponent, Footer, RouterModule, Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  mediaItems: IMovie[] = [];
  pageNumber = 1;
  totalPages = 1;

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
}
