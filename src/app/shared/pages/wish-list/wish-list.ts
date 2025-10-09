import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WishlistService, WishlistMovie } from '@shared/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wish-list.html',
  styleUrls: ['./wish-list.css'],
})
export class WishList implements OnInit {
  private wishlist = inject(WishlistService);
  private router = inject(Router);

  items: WishlistMovie[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.wishlist.list$().subscribe({
      next: (items) => { this.items = items; this.loading = false; },
      error: (err) => { this.error = String(err); this.loading = false; },
    });
  }

  goToDetails(id: number) { this.router.navigate(['/movie', id]); }

  async remove(it: WishlistMovie, e?: Event) {
    e?.preventDefault(); e?.stopPropagation();
    try { await this.wishlist.remove(it.id); } catch {}
  }

  displayDate(it: WishlistMovie): string {
    return it.release_date || it.first_air_date || '';
  }

  poster(it: WishlistMovie): string {
    return it.poster_path
      ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${it.poster_path}`
      : '/assets/placeholder-poster.png';
  }
}
