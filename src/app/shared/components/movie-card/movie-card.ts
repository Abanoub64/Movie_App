import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { IMovie } from '@shared/interface/interfaces';
import { WishlistService } from '@shared/services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCard implements OnInit, OnDestroy {
  @Input() movie!: IMovie;

  inWishlist = false;
  toggling = false;
  private sub?: Subscription;

  constructor(private router: Router, private wishlist: WishlistService, private auth: Auth) {}

  ngOnInit() {
    this.sub = this.wishlist.wishlistIds$.subscribe((set) => {
      this.inWishlist = set.has(this.movie.id);
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  get slug(): string {
    return (
      this.getTitle(this.movie)
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // شيل أي رموز غير حروف أو أرقام
        .replace(/^-+|-+$/g, '') ?? ''
    );
  }

  get posterUrl(): string {
    return this.movie.poster_path
      ? `https://media.themoviedb.org/t/p/w440_and_h660_face${this.movie.poster_path}`
      : '/assets/placeholder-poster.png';
  }
  get posterUrl2x(): string {
    return this.movie.poster_path
      ? `https://media.themoviedb.org/t/p/w880_and_h1320_face${this.movie.poster_path}`
      : '/assets/placeholder-poster.png';
  }
  get movieUrl(): string {
    return `/movie/${this.movie.id}-${this.slug}`;
  }
  getTitle(item: IMovie): string {
    return item.title == undefined ? item.name : item.title;
  }

  get userScorePercent(): number {
    return Math.round(this.movie.vote_average * 10);
  }
  get scoreColor(): string {
    const s = this.userScorePercent;
    if (s >= 70) return '#21d07a';
    if (s >= 40) return '#d2d531';
    return '#db2360';
  }
  get trackColor(): string {
    return '#032541';
  }

  get displayDate(): string {
    const d = this.movie.release_date || (this.movie as any).first_air_date || '';
    return d || '';
  }

  goToMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
  onOptionsClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  async toggleWishlist(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.toggling) return;

    this.toggling = true;
    try {
      if (this.inWishlist) {
        await this.wishlist.remove(this.movie.id);
      } else {
        await this.wishlist.add({
          id: this.movie.id,
          title: this.movie.title,
          poster_path: this.movie.poster_path ?? null,
          vote_average: this.movie.vote_average ?? 0,
          release_date: this.movie.release_date ?? null,
          first_air_date: (this.movie as any).first_air_date ?? null,
          overview: (this.movie as any).overview ?? null,
          vote_count: (this.movie as any).vote_count ?? null,
        });
      }
    } finally {
      this.toggling = false;
    }
  }
}
