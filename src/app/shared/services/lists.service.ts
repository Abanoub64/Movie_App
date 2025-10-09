import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Database, ref, set, remove, push } from '@angular/fire/database';
import { objectVal, listVal } from '@angular/fire/database';
import { Observable, of, map, switchMap, shareReplay } from 'rxjs';

export interface UserList {
  id: string;
  name: string;
  description?: string | null;
  isPublic: boolean;
  createdAt: number;
}

export interface ListItem {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number | null;
  addedAt: number;
}

@Injectable({ providedIn: 'root' })
export class ListsService {
  private db = inject(Database);
  private auth = inject(Auth);

  private requireUid(): string {
    if (!this.auth.currentUser) throw new Error('Not authenticated');
    return this.auth.currentUser.uid;
  }

  lists$(): Observable<UserList[]> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) return of<UserList[]>([]);
        const r = ref(this.db, `users/${user.uid}/lists`);
        return objectVal<Record<string, Omit<UserList,'id'> & Partial<UserList>> | null>(r).pipe(
          map(obj => {
            if (!obj) return [];
            return Object.entries(obj).map(([id, v]) => ({
              id,
              name: v.name ?? '',
              description: v.description ?? null,
              isPublic: !!v.isPublic,
              createdAt: v.createdAt ?? 0,
            })).sort((a,b)=>b.createdAt - a.createdAt);
          })
        );
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  list$(listId: string): Observable<UserList | null> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) return of(null);
        const r = ref(this.db, `users/${user.uid}/lists/${listId}`);
        return objectVal<Omit<UserList, 'id'> | null>(r).pipe(
          map(v => v ? ({ id: listId, ...v }) as UserList : null)
        );
      })
    );
  }

  listItems$(listId: string): Observable<ListItem[]> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) return of<ListItem[]>([]);
        const r = ref(this.db, `users/${user.uid}/list_items/${listId}`);
        return objectVal<Record<string, ListItem> | null>(r).pipe(
          map(obj => {
            if (!obj) return [];
            return Object.values(obj).sort((a,b) => (b.addedAt ?? 0) - (a.addedAt ?? 0));
          })
        );
      })
    );
  }

  async createList(input: { name: string; description?: string | null; isPublic: boolean; }): Promise<string> {
    const uid = this.requireUid();
    const newRef = push(ref(this.db, `users/${uid}/lists`));
    const payload: Omit<UserList,'id'> = {
      name: input.name,
      description: input.description ?? null,
      isPublic: input.isPublic,
      createdAt: Date.now(),
    };
    await set(newRef, payload);
    return newRef.key as string;
  }

  async addItem(listId: string, media: { id: number; title: string; poster_path: string | null; vote_average?: number | null; }) {
    const uid = this.requireUid();
    const node = ref(this.db, `users/${uid}/list_items/${listId}/${media.id}`);
    await set(node, {
      id: media.id,
      title: media.title,
      poster_path: media.poster_path ?? null,
      vote_average: media.vote_average ?? null,
      addedAt: Date.now(),
    } as ListItem);
  }

  async removeItem(listId: string, mediaId: number) {
    const uid = this.requireUid();
    await remove(ref(this.db, `users/${uid}/list_items/${listId}/${mediaId}`));
  }
  async deleteList(listId: string) {
  const uid = this.requireUid();
  await remove(ref(this.db, `users/${uid}/lists/${listId}`));
  await remove(ref(this.db, `users/${uid}/list_items/${listId}`));
}
}
