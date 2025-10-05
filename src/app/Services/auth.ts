import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private auth = inject(Auth);  

  // تسجيل مستخدم جديد
  register(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(cred => updateProfile(cred.user, { displayName: name }));
  }

  // تسجيل دخول مستخدم موجود
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // تسجيل خروج المستخدم
  logout() {
    return signOut(this.auth);
  }
}
export { Auth };

