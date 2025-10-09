import { Component, computed, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { ButtonWithMenu } from '../button-with-menu/button-with-menu';
import { WishlistService } from '@shared/services/wishlist.service';
import { LanguageService } from '@shared/services/language-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ButtonWithMenu, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private languageService = inject(LanguageService);
  private userSignal = signal<{ uid: string | null } | null>(null);
  isLoggedIn = computed(() => !!this.userSignal()?.uid);

  currentLanguage = this.languageService.currentLanguage;

  languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
  ];

  private wishlist = inject(WishlistService);
  count$ = this.wishlist.count$;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSignal.set(user ? { uid: user.uid } : null);
    });
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  isCurrentRoute(path: string): boolean {
    // تجاهل أي query params أثناء المطابقة
    return this.router.url.split('?')[0] === path;
    // أو: return this.router.url.startsWith(path);
  }
  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
  t(key: string) {
    return this.languageService.t(key);
  }
}
