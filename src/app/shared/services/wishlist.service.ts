import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Database, ref, set, remove } from '@angular/fire/database';
import { objectVal } from '@angular/fire/database';
import { Observable, of, map, switchMap, shareReplay } from 'rxjs';

export interface WishlistMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string | null;
  first_air_date?: string | null;
  overview?: string | null;
  vote_count?: number | null;
  addedAt: number;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private db = inject(Database);
  private auth = inject(Auth);

  /** خريطة الويش ليست للمستخدم الحالي (أو {} لو مش لوج إن) */
  private readonly wishlistMap$: Observable<Record<string, WishlistMovie>> = authState(this.auth).pipe(
    switchMap(user => {
      if (!user) return of({});
      const r = ref(this.db, `users/${user.uid}/wishlist`);
      return objectVal<Record<string, WishlistMovie> | null>(r).pipe(
        map(data => data ?? {})
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /** IDs ست جاهز وسريع لعلامة القلب في كل الكروت */
  readonly wishlistIds$: Observable<Set<number>> = this.wishlistMap$.pipe(
    map(obj => new Set(Object.values(obj).map(m => m.id)))
  );

  /** عدّاد العناصر (size) للويش ليست */
  readonly count$ = this.wishlistIds$.pipe(map(set => set.size));

  /** قائمة مرتبة زمنياً */
  list$(): Observable<WishlistMovie[]> {
    return this.wishlistMap$.pipe(
      map(obj => {
        const arr = Object.values(obj);
        arr.sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0));
        return arr;
      })
    );
  }

  private requireUid(): string {
    if (!this.auth.currentUser) throw new Error('Not authenticated');
    return this.auth.currentUser.uid;
  }

  async add(movie: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string | null;
    first_air_date?: string | null;
    overview?: string | null;
    vote_count?: number | null;
  }) {
    const uid = this.requireUid();
    const node = ref(this.db, `users/${uid}/wishlist/${movie.id}`);
    const payload: WishlistMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path ?? null,
      vote_average: movie.vote_average ?? 0,
      release_date: movie.release_date ?? null,
      first_air_date: movie.first_air_date ?? null,
      overview: movie.overview ?? null,
      vote_count: movie.vote_count ?? null,
      addedAt: Date.now(),
    };
    return set(node, payload);
  }

  async remove(movieId: number) {
    const uid = this.requireUid();
    return remove(ref(this.db, `users/${uid}/wishlist/${movieId}`));
  }
}
