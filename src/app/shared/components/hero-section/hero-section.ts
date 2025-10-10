import { Component, inject, signal } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '@shared/services/language-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [SearchBar, RouterModule, CommonModule ],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  languageService = inject(LanguageService);
  constructor(private router: Router) {}

    isDark = signal(false);

    ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDark.set(true);
      document.body.classList.add('dark');
    }
  }

  toggleTheme() {
    const newTheme = !this.isDark();
    this.isDark.set(newTheme);

    if (newTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onClick() {
    this.router.navigate(['/search']);
  }
}
