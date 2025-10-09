import { Component, computed, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {

  private userSignal = signal<{ uid: string | null } | null>(null);
  isLoggedIn = computed(() => !!this.userSignal()?.uid);

  
  isDark = signal(false);

  constructor(private auth: Auth, private router: Router) {

    onAuthStateChanged(this.auth, (user) => {
      this.userSignal.set(user ? { uid: user.uid } : null);
    });
  }

  ngOnInit() {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDark.set(true);
      document.body.classList.add('dark');
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  isCurrentRoute(path: string): boolean {
    return this.router.url === path;
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
}
