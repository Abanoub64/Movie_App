import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
   languageService = inject(LanguageService);
  searchString = signal('');
  @Output() searchChange = new EventEmitter<string>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchString.set(input.value);
    this.searchChange.emit(input.value); // 👈 نبعت القيمة للـ parent
  }
}
