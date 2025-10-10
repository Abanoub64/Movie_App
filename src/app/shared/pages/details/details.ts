import { CommonModule } from '@angular/common';
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { IMovie, IMovieDetails, IMoviesResponse } from '@shared/interface/interfaces';
import { Footer } from '@shared/components/footer/footer';
import { Navbar } from '@shared/components/navbar/navbar';
import { MoviesService } from '@shared/services/movies-service';
import { MovieCard } from '@shared/components/movie-card/movie-card';
import { Carousel } from '@shared/components/carousel/carousel';
import { TvServices } from '@shared/services/tv-services';
import { WishlistService } from '@shared/services/wishlist.service';
import { Auth } from '@angular/fire/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule,  MovieCard, Carousel],
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
})
export class Details implements OnInit {
  details?: IMovieDetails;
  recommendations: IMovie[] = [];
  mediaType: 'movie' | 'tv' = 'movie';

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly moviesService = inject(MoviesService);
  private readonly tvservice = inject(TvServices);
  private readonly wishlist = inject(WishlistService);
  private readonly auth = inject(Auth);
  private readonly destroyRef = inject(DestroyRef);

  private readonly imgBase = 'https://image.tmdb.org/t/p';
  private readonly posterSize = 'w500';
  private readonly logoSize = 'w185';

  movieId = '';
  loading = false;
  errorMsg = '';
  inWishlist = false;
  toggling = false;

  private latestWishlistSet: Set<number> = new Set();

  ngOnInit(): void {
    this.wishlist.wishlistIds$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((set) => {
        this.latestWishlistSet = set;
        if (this.movieId) this.inWishlist = set.has(+this.movieId);
      });

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const fullURL = params.get('id') ?? '';
        const [idPart] = fullURL.split('-');
        this.movieId = idPart;

        const path = this.route.snapshot.routeConfig?.path ?? '';
        const isTv = path.startsWith('tv');
        this.mediaType = isTv ? 'tv' : 'movie';
        this.inWishlist = this.latestWishlistSet.has(+this.movieId);

        this.errorMsg = '';
        this.loading = true;
        if (isTv) this.loadTvDetails();
        else this.loadMovieDetails();
      });
  }

  private loadMovieDetails(): void {
    this.moviesService.getMoiveDetails(+this.movieId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: IMovieDetails) => {
        this.details = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load movie details.';
        this.loading = false;
      },
    });

    this.moviesService.getMoivesRecommendations(+this.movieId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: IMoviesResponse) => (this.recommendations = res?.results ?? []),
      error: (err) => console.error(err),
    });
  }

  private loadTvDetails(): void {
    this.tvservice.getTVDetails(+this.movieId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: IMovieDetails) => {
        this.details = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load TV details.';
        this.loading = false;
      },
    });

    this.tvservice.getTvRecommendations(+this.movieId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: IMoviesResponse) => (this.recommendations = res?.results ?? []),
      error: (err) => console.error(err),
    });
  }

  // 🧩 Getters لتفادي Parser Error
  get titleText(): string {
    const d: any = this.details;
    return (d?.title ?? d?.name ?? '').toString();
  }

  get releaseDateText(): string | null {
    const d: any = this.details;
    return d?.release_date ?? d?.first_air_date ?? null;
  }

  // Helpers
  imgPoster(path: string | null) {
    return path ? `${this.imgBase}/${this.posterSize}${path}` : 'assets/placeholder-poster.png';
  }
  imgLogo(path: string | null) {
    return path ? `${this.imgBase}/${this.logoSize}${path}` : '';
  }
  minutesToHM(mins: number | null | undefined): string {
    if (mins == null) return '';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  }
  ratingStars(voteAverage: number | null | undefined): any[] {
    const v = typeof voteAverage === 'number' ? voteAverage : 0;
    const filled = Math.min(5, Math.max(0, Math.round(v / 2)));
    return Array.from({ length: filled });
  }
  emptyStars(voteAverage: number | null | undefined): any[] {
    const v = typeof voteAverage === 'number' ? voteAverage : 0;
    const filled = Math.min(5, Math.max(0, Math.round(v / 2)));
    return Array.from({ length: 5 - filled });
  }
  languagesList(langs?: { english_name: string }[] | null): string {
    return Array.isArray(langs) ? langs.map((l) => l.english_name).filter(Boolean).join(', ') : '';
  }

  // ❤️ Toggle wishlist من صفحة التفاصيل
  async toggleWishlistFromDetails() {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.details || this.toggling) return;

    this.toggling = true;
    try {
      if (this.inWishlist) {
        await this.wishlist.remove(+this.movieId);
      } else {
        const d: any = this.details;
        await this.wishlist.add({
          id: +this.movieId,
          title: d.title ?? d.name ?? 'Untitled',
          poster_path: d.poster_path ?? null,
          vote_average: d.vote_average ?? 0,
          release_date: d.release_date ?? null,
          first_air_date: d.first_air_date ?? null,
          overview: d.overview ?? null,
          vote_count: d.vote_count ?? null,
        });
      }
    } finally {
      this.toggling = false;
    }
  }
}
