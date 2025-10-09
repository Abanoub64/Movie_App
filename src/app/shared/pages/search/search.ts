import { Component, Input, OnInit } from '@angular/core';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { IMovie, IMoviesResponse } from '@shared/interface/interfaces';
import { MoviesService } from '@shared/services/movies-service';
import { MovieCard } from '@shared/components/movie-card/movie-card';

@Component({
  selector: 'app-search',
  imports: [SearchBar, MovieCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  resultItems: IMovie[] = [];
  @Input() searchString: string = '';

  constructor(private movieService: MoviesService) {}
  ngOnInit(): void {
    this.getSeacrch();
  }
  getSeacrch() {
    this.movieService.getMultiSearch(this.searchString).subscribe({
      next: (res: IMoviesResponse) => {
        this.resultItems = res.results;
      },
      error: (err) => console.error('Error loading movies', err),
    });
  }

  onSearchChange(value: string) {
    this.searchString = value;
  }

  searchBtn() {
    this.getSeacrch();
  }
}
