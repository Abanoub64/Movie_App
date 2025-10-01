import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './media-card.html',
  styleUrls: ['./media-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onCardClick()',
  },
})
export class MediaCardComponent {
  title = input.required<string>();
  date = input.required<string>();
  rating = input.required<number>();
  image = input.required<string>();

  ratingColor = computed(() => {
    const rating = this.rating();
    if (rating >= 80) return 'bg-green-500';
    if (rating >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  });

  onMenuClick(event: Event): void {
    event.stopPropagation();
    console.log('Menu clicked for:', this.title());
  }

  onCardClick(): void {
    console.log('Card clicked:', this.title());
  }
}
