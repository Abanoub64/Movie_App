import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class Login implements OnInit {
  email = '';
  password = '';
  showPass = false;
  loading = false;

  successMessage = '';
  errorMessage = '';

  constructor(private auth: Auth, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // لو جاي من صفحة Register بعد SignUp نعرض رسالة نجاح
    const justSignedUp = this.route.snapshot.queryParamMap.get('justSignedUp');
    if (justSignedUp === '1') {
      this.successMessage = 'Account created successfully. Please log in.';
    }
  }

  private mapFirebaseError(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/missing-password':
        return 'Please enter your password';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters';
      case 'auth/user-not-found':
        return 'No user found for this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later';
      default:
        return 'Login failed, please try again';
    }
  }

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';

    // ✅ validation سريع قبل ما نكلم Firebase
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Enter a valid email';
      return;
    }
    if (!this.password || this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        this.successMessage = '✅ Login is success';
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        this.errorMessage = this.mapFirebaseError(err.code || err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
