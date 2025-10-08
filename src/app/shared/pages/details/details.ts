import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IMovieDetails } from '@shared/interface/interfaces';
import { MOCK_MOVIE_DETAILS } from '@shared/mocks/mock-movie-details';
import { Footer } from '@shared/components/footer/footer';
import { Navbar } from '@shared/components/navbar/navbar';
import { MoviesService } from '@shared/services/movies-service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, Footer, Navbar],
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
})
export class Details implements OnInit {
  details?: IMovieDetails;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}
  private imgBase = 'https://image.tmdb.org/t/p';
  private posterSize = 'w500';
  private logoSize = 'w185';
  public movieId: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const fullURL = params.get('id') ?? '';

      const [idPart, ...slugParts] = fullURL?.split('-');
      this.movieId = idPart;
    });
    this.moviesService.getMoiveDetails(+this.movieId).subscribe({
      next: (res: IMovieDetails) => {
        console.log(res);

        this.details = res;
      },
      error: (err) => console.error('Error loading movies', err),
    });
  }
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
    return Array.isArray(langs) ? langs.map((l) => l.english_name).join(', ') : '';
  }
}
