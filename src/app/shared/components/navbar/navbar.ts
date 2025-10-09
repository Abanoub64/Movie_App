import { Component, computed, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  Auth,
  onAuthStateChanged,
  signOut,
  deleteUser,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { ButtonWithMenu } from '../button-with-menu/button-with-menu';
import { WishlistService } from '@shared/services/wishlist.service';
import { LanguageService } from '@shared/services/language-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, ButtonWithMenu, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private languageService = inject(LanguageService);
  private userSignal = signal<{
    uid: string | null;
    displayName?: string | null;
    email?: string | null;
  } | null>(null);

  isLoggedIn = computed(() => !!this.userSignal()?.uid);
  displayName = computed(() => this.userSignal()?.displayName ?? null);
  email = computed(() => this.userSignal()?.email ?? null);

  accountDrawerOpen = false;

  // Username Modal
  usernameModalOpen = false;
  newUsername = '';
  usernameError = '';
  usernameSuccess = '';

  // Password Modal
  passwordModalOpen = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  passwordError = '';
  passwordSuccess = '';

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
      this.userSignal.set(
        user ? { uid: user.uid, displayName: user.displayName, email: user.email } : null
      );
    });
  }

  openAccountDrawer() {
    if (!this.isLoggedIn()) return;
    if (this.isCurrentRoute('/login') || this.isCurrentRoute('/register')) return;
    this.accountDrawerOpen = true;
  }

  closeAccountDrawer() {
    this.accountDrawerOpen = false;
  }

  async logout() {
    await signOut(this.auth);
    this.userSignal.set(null);
    this.closeAccountDrawer();
    this.router.navigate(['/login']).then(() => this.closeAccountDrawer());
  }

  // ---- Change Username ----
  goChangeUsername() {
    this.closeAccountDrawer();
    this.usernameModalOpen = true;
    this.newUsername = (this.displayName() || '').trim();
    this.usernameError = '';
    this.usernameSuccess = '';
  }

  closeUsernameModal() {
    this.usernameModalOpen = false;
  }

  async saveUsername() {
    this.usernameError = '';
    this.usernameSuccess = '';

    const name = this.newUsername.trim();
    if (!name) {
      this.usernameError = 'Username cannot be empty';
      return;
    }
    if (name.length < 3) {
      this.usernameError = 'Username must be at least 3 characters';
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      this.usernameError = 'Not signed in';
      return;
    }

    try {
      await updateProfile(user, { displayName: name });
      this.userSignal.set({ uid: user.uid, displayName: name, email: user.email });
      this.usernameSuccess = 'Username updated successfully ✅';
      setTimeout(() => this.closeUsernameModal(), 1200);
    } catch (err) {
      this.usernameError = 'Failed to update username. Please re-login.';
    }
  }

  // ---- Change Password ----
  goChangePassword() {
    this.closeAccountDrawer();
    this.passwordModalOpen = true;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordError = '';
    this.passwordSuccess = '';
  }

  closePasswordModal() {
    this.passwordModalOpen = false;
  }

  async savePassword() {
    this.passwordError = '';
    this.passwordSuccess = '';

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.passwordError = 'All fields are required';
      return;
    }
    if (this.newPassword.length < 6) {
      this.passwordError = 'New password must be at least 6 characters';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    }

    const user = this.auth.currentUser;
    if (!user || !user.email) {
      this.passwordError = 'No user logged in';
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, this.newPassword);

      this.passwordSuccess = 'Password updated successfully ✅';
      setTimeout(() => this.closePasswordModal(), 1200);
    } catch (err) {
      this.passwordError = 'Failed to update password. Current password may be wrong.';
    }
  }

  // ---- Delete Account ----
  async deleteAccount() {
    this.closeAccountDrawer();
    const confirmed = confirm('Are you sure? This action cannot be undone.');
    if (!confirmed) return;

    const user = this.auth.currentUser;
    if (!user) return;

    try {
      await deleteUser(user);
      this.userSignal.set(null);
      this.router.navigate(['/home']);
    } catch (e) {
      alert('Delete failed (maybe needs recent login). Please log in again and retry.');
      this.router.navigate(['/login'], { queryParams: { reauth: 1 } });
    }
  }

  isCurrentRoute(path: string): boolean {
    return this.router.url.split('?')[0] === path;
  }
  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
  t(key: string) {
    return this.languageService.t(key);
  }
}
