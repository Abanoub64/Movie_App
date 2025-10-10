import {Component,Input,OnInit,HostListener,ElementRef,EventEmitter,Output,inject,DestroyRef,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IMovie } from '@shared/interface/interfaces';
import { WishlistService } from '@shared/services/wishlist.service';

type MediaPayload = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number | null;
};

type MenuOptionKey = 'add' | 'fav';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCard implements OnInit {
  @Input() movie!: IMovie;
  @Input() routerLinkBase: string = '/movie';

  @Output() addToList = new EventEmitter<MediaPayload>();

  inWishlist = false;
  toggling = false;
  menuOpen = false;

  readonly menuOptions: { label: string; icon: string; key: MenuOptionKey }[] = [
    { label: 'Add to list', icon: '≡', key: 'add' },
    { label: 'Wishlist',    icon: '♥', key: 'fav' },
  ];

  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private wishlist: WishlistService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.wishlist.wishlistIds$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((set) => {
        this.inWishlist = set.has(this.movie.id);
      });
  }

  get posterUrl(): string {
    return this.movie?.poster_path
      ? `https://media.themoviedb.org/t/p/w440_and_h660_face${this.movie.poster_path}`
      : '/assets/placeholder-poster.png';
  }
  get posterUrl2x(): string {
    return this.movie?.poster_path
      ? `https://media.themoviedb.org/t/p/w880_and_h1320_face${this.movie.poster_path}`
      : '/assets/placeholder-poster.png';
  }

  get movieLink() {
    return [this.routerLinkBase, this.movie.id];
  }

  getTitle(item: IMovie): string {
    return (item.title ?? (item as any).name ?? 'Untitled').toString();
  }

  get userScorePercent(): number {
    const raw = (this.movie?.vote_average ?? 0) * 10;
    const val = Math.round(raw);
    return Number.isFinite(val) && val > 0 ? val : 0;
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
    const d = this.movie?.release_date || (this.movie as any)?.first_air_date || '';
    return d || '';
  }

  goToMovie(id: number) {
    this.router.navigate(['/movie', id]);
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
          title: this.getTitle(this.movie),
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

  onMenuClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  async handleOption(key: MenuOptionKey, e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if (key === 'add') {
      if (!this.auth.currentUser) {
        this.router.navigate(['/login']);
        return;
      }
      this.menuOpen = false;
      this.addToList.emit({
        id: this.movie.id,
        title: this.getTitle(this.movie),
        poster_path: this.movie.poster_path ?? null,
        vote_average: this.movie.vote_average ?? null,
      });
      return;
    }

    if (key === 'fav') {
      if (!this.auth.currentUser) {
        this.router.navigate(['/login']);
        return;
      }

      if (this.inWishlist) {
        this.menuOpen = false;
        return;
      }

      try {
        await this.wishlist.add({
          id: this.movie.id,
          title: this.getTitle(this.movie),
          poster_path: this.movie.poster_path ?? null,
          vote_average: this.movie.vote_average ?? 0,
          release_date: this.movie.release_date ?? null,
          first_air_date: (this.movie as any).first_air_date ?? null,
          overview: (this.movie as any).overview ?? null,
          vote_count: (this.movie as any).vote_count ?? null,
        });
      } finally {
        this.menuOpen = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  closeMenuOnOutside(ev: MouseEvent) {
    const target = ev.target as Node;
    if (!this.hostEl.nativeElement.contains(target)) {
      this.menuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.menuOpen = false;
  }
}
