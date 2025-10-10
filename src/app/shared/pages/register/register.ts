import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [FormsModule, CommonModule, RouterLink],
})
export class Register {
  languageService = inject(LanguageService);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

  get passwordMismatch() {
    return this.password && this.confirmPassword && this.password !== this.confirmPassword;
  }

  async onRegister() {
    this.errorMessage = '';

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Email is Not Valid';
      return;
    }

    if (!this.name.trim()) {
      this.errorMessage = 'Name is required';
      return;
    }

    const passRegex = /^[A-Za-z0-9]{6,}$/;
    if (!passRegex.test(this.password)) {
      this.errorMessage = 'PassWord Must Contain 6 Character';
      return;
    }

    if (this.passwordMismatch) {
      this.errorMessage = 'PassWord Not Match';
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      await updateProfile(cred.user, { displayName: this.name.trim() });

      await cred.user.reload();


      await this.router.navigate(['/home']);
    } catch (err: any) {
      this.errorMessage = err?.message || 'Registration failed';
    }
  }
}
