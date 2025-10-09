import {ChangeDetectionStrategy, Component,computed,ElementRef, HostListener, inject, input, signal, ViewChild,} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ListsService } from '../../../shared/services/lists.service';
import { take } from 'rxjs';
import { ListDialog } from '@shared/pages/list-dialog/list-dialog';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './media-card.html',
  styleUrls: ['./media-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'onCardClick()' },
})
export class MediaCardComponent {
  title = input.required<string>();
  date = input.required<string>();
  rating = input.required<number>();
  image = input.required<string>();

  private lists = inject(ListsService);
  private hostEl = inject(ElementRef<HTMLElement>);

  menuOpen = signal(false);
  showCreateHint = signal(false);
  createOpen = signal(false);

  @ViewChild('menuPanel') menuPanel?: any;
  @ViewChild('hintPopover') hintPopover?: any;

  ratingColor = computed(() => {
    const r = this.rating();
    if (r >= 80) return 'bg-green-500';
    if (r >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  });

  onMenuClick(event: Event): void {
    event.stopPropagation();
    this.menuOpen.update(v => !v);
    this.showCreateHint.set(false);
  }

  onCardClick(): void {}

  onAddToList(event: Event) {
    event.stopPropagation();
    this.lists.lists$().pipe(take(1)).subscribe(ls => {
      if (!ls.length) {
        this.showCreateHint.set(true);
      } else {
        this.openCreateDialog(event);
      }
    });
  }

  openCreateDialog(event?: Event) {
    event?.stopPropagation();
    this.menuOpen.set(false);
    this.showCreateHint.set(false);
    this.createOpen.set(true);
  }

  onFavorite(event: Event) { event.stopPropagation(); this.menuOpen.set(false); }
  onWatchlist(event: Event) { event.stopPropagation(); this.menuOpen.set(false); }
  onYourRating(event: Event) { event.stopPropagation(); this.menuOpen.set(false); }

  onListCreated(_listId: string) {
    this.createOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  closeOnOutside(ev: MouseEvent) {
    const host = this.hostEl.nativeElement;
    if (!host.contains(ev.target as Node)) {
      this.menuOpen.set(false);
      this.showCreateHint.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.menuOpen.set(false);
    this.showCreateHint.set(false);
    this.createOpen.set(false);
  }
}
