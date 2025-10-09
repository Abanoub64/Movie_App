 import { Component, computed, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { ButtonWithMenu } from '../button-with-menu/button-with-menu';
import { WishlistService } from '@shared/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ButtonWithMenu],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private userSignal = signal<{ uid: string | null } | null>(null);
  isLoggedIn = computed(() => !!this.userSignal()?.uid);

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
}
