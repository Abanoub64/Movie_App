import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { SafeUrlPipe } from 'src/app/pipes/safe-url-pipe';

@Component({
  selector: 'app-trailer-player',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './trailer-player.html',
})
export class TrailerPlayerComponent {
  @Input() youtubeKey: string = '';
  @Output() close = new EventEmitter<void>();

  get youtubeUrl() {
    return `https://www.youtube.com/embed/${this.youtubeKey}?autoplay=1&modestbranding=1&fs=1`;
  }

  // اقفل لما المستخدم يدوس برا
  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close.emit();
    }
  }

  closeModal() {
    this.close.emit();
  }

  // اختصار ESC
  @HostListener('document:keydown.escape')
  onEscKey() {
    this.close.emit();
  }
}
