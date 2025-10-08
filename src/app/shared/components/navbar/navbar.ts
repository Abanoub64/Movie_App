import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { ButtonWithMenu } from '../button-with-menu/button-with-menu';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, ButtonWithMenu],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private userSignal = signal<{ uid: string | null } | null>(null);
  isLoggedIn = computed(() => !!this.userSignal()?.uid);

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
    return this.router.url === path;
  }
}
