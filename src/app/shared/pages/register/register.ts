import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [FormsModule,CommonModule]
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

  // تحقق من تطابق الباسورد
  get passwordMismatch() {
    return this.password && this.confirmPassword && this.password !== this.confirmPassword;
  }

  // عند الضغط على Sign Up
  onRegister() {
    // validation للإيميل
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'البريد الإلكتروني غير صالح';
      return;
    }

    // validation للباسورد
    const passRegex = /^[A-Za-z0-9]{6,}$/;
    if (!passRegex.test(this.password)) {
      this.errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل';
      return;
    }

    if (this.passwordMismatch) {
      this.errorMessage = 'كلمة المرور غير متطابقة';
      return;
    }

    // إنشاء المستخدم في Firebase
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(userCredential => {
        // تحديث الاسم
        return updateProfile(userCredential.user, { displayName: this.name });
      })
      .then(() => {
        this.router.navigate(['/home']); // تحويل المستخدم للصفحة الرئيسية
      })
      .catch(err => {
        this.errorMessage = err.message;
      });
  }
}