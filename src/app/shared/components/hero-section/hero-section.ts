import { Component, inject } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-hero-section',
  imports: [SearchBar, RouterModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  languageService = inject(LanguageService);
  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['/search']);
  }
}
