import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMovieDetails } from '@shared/interface/interfaces';
import { MOCK_MOVIE_DETAILS } from '@shared/mocks/mock-movie-details';
import { Footer } from "@shared/components/footer/footer";
import { Navbar } from "@shared/components/navbar/navbar";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, Footer, Navbar],
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
})
export class Details {
  details: IMovieDetails = MOCK_MOVIE_DETAILS;

  // TMDB images (مش API calls)
  private imgBase = 'https://image.tmdb.org/t/p';
  private posterSize = 'w500';
  private logoSize = 'w185';

  imgPoster(path: string | null) {
    return path ? `${this.imgBase}/${this.posterSize}${path}` : 'assets/placeholder-poster.png';
  }
  imgLogo(path: string | null) {
    return path ? `${this.imgBase}/${this.logoSize}${path}` : '';
  }
  minutesToHM(mins: number | null) {
    if (mins == null) return '';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h} Min.`.replace(' ', '').replace('Min.', `${m ? `${h}h ${m}m` : `${h}h`}`);
  }
  ratingStars(voteAverage: number) {
    const filled = Math.round(voteAverage / 2); // 0..5
    return Array.from({ length: filled });
  }
  emptyStars(voteAverage: number) {
    const filled = Math.round(voteAverage / 2);
    return Array.from({ length: 5 - filled });
  }
  languagesList(
    langs?: { english_name: string; iso_639_1: string; name: string }[] | null
  ): string {
    return Array.isArray(langs) ? langs.map(l => l.english_name).join(', ') : '';
  }
}
