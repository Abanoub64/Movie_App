import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from '@shared/interface/interfaces';

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  slug: string;
}

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCard {
  @Input() movie!: IMovie;

  get slug(): string {
    return this.movie.title.toLowerCase().replace(/\s+/g, '-');
  }

  get movieUrl(): string {
    return `/movie/${this.movie.id}-${this.slug}`;
  }

  get posterUrl(): string {
    return `https://media.themoviedb.org/t/p/w220_and_h330_face${this.movie.poster_path}`;
  }

  get posterUrl2x(): string {
    return `https://media.themoviedb.org/t/p/w440_and_h660_face${this.movie.poster_path}`;
  }

  get userScorePercent(): number {
    return Math.round(this.movie.vote_average * 10);
  }

  get scoreColor(): string {
    const score = this.userScorePercent;
    if (score >= 70) return '#21d07a';
    if (score >= 40) return '#d2d531';
    return '#db2360';
  }

  get trackColor(): string {
    const score = this.userScorePercent;
    // if (score >= 70) return '#3b82f680';
    // if (score >= 40) return '#3b82f680';
    return '#032541';
  }

  get ratingClass(): string {
    return `icon-r${this.userScorePercent}`;
  }

  onOptionsClick(event: Event): void {
    event.preventDefault();
    // Handle options menu click
    console.log('Options clicked for movie:', this.movie.id);
  }
}
