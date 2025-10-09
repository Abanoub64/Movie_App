import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

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
export class MovieCard implements OnInit, OnDestroy {
  @Input() movie!: IMovie;

  /** للأب علشان يفتح الدايالوج برّه الكارد */
  @Output() addToList = new EventEmitter<MediaPayload>();

  inWishlist = false;
  toggling = false;
  menuOpen = false;

  /** عناصر قائمة الثلاث نقاط */
  readonly menuOptions: { label: string; icon: string; key: MenuOptionKey }[] = [
    { label: 'Add to list', icon: '≡', key: 'add' },
    { label: 'WishList  ', icon: '♥', key: 'fav' },
  ];

  private hostEl: ElementRef<HTMLElement> = inject(ElementRef);
  private sub?: Subscription;

  constructor(private router: Router, private wishlist: WishlistService, private auth: Auth) {}

  ngOnInit() {
    // ✅ متابعة حالة الويش ليست للمستخدم الحالي (بتشتغل بعد الريلود تلقائي)
    this.sub = this.wishlist.wishlistIds$.subscribe((set) => {
      this.inWishlist = set.has(this.movie.id);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  /** صور البوستر */
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

  /** ❤️ قلب الويش ليست (Toggle) */
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

  /** زر الثلاث نقاط */
  onMenuClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  /** Dispatcher لاختيارات المينيو */
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
        title: this.movie.title,
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

      // لو موجود بالفعل في الويش ليست، اقفل المينيو وخلاص
      if (this.inWishlist) {
        this.menuOpen = false;
        return;
      }

      // إضافة سريعة للويش ليست (هتظهر في صفحة WishList تلقائيًا)
      try {
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
      } finally {
        this.menuOpen = false;
      }
      return;
    }
  }

  /** قفل المينيو لما نضغط خارج الكارد */
  @HostListener('document:click', ['$event'])
  closeMenuOnOutside(ev: MouseEvent) {
    const target = ev.target as Node;
    if (!this.hostEl.nativeElement.contains(target)) {
      this.menuOpen = false;
    }
  }

  /** Escape يقفل المينيو */
  @HostListener('document:keydown.escape')
  onEsc() {
    this.menuOpen = false;
  }
}
