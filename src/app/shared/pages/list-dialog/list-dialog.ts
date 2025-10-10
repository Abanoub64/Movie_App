import { Component, Input, Output, EventEmitter, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ListsService, UserList } from '@shared/services/lists.service';
import { Observable } from 'rxjs';

type MediaPayload = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number | null;
};

@Component({
  selector: 'app-list-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-dialog.html',
  styleUrls: ['./list-dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDialog implements OnInit {
  @Input() open = false;

  @Input() media?: MediaPayload;

  @Output() closed = new EventEmitter<void>();

  private listsSvc = inject(ListsService);
  private router = inject(Router);

  lists$!: Observable<UserList[]>;
  selectedListId: string | null = null;
  saving = false;
  error = '';

  ngOnInit(): void {
    this.lists$ = this.listsSvc.lists$();
  }

  stop(e: Event) { e.stopPropagation(); }
  close() { this.closed.emit(); }

  async addToSelectedList() {
    if (!this.media || !this.selectedListId || this.saving) return;
    this.saving = true; this.error = '';
    try {
      await this.listsSvc.addItem(this.selectedListId, {
        id: this.media.id,
        title: this.media.title,
        poster_path: this.media.poster_path ?? null,
        vote_average: this.media.vote_average ?? null,
      });
      this.close();
    } catch (e: any) {
      this.error = e?.message || String(e);
    } finally {
      this.saving = false;
    }
  }

  createList() {
    const q = this.media ? {
      movieId: String(this.media.id),
      title: this.media.title ?? '',
      poster: this.media.poster_path ?? '',
      score: String(this.media.vote_average ?? '')
    } : {};
    this.close();
    this.router.navigate(['/lists/create'], { queryParams: q });
  }

  viewMyLists() {
    this.close();
    this.router.navigate(['/lists']);
  }
}
