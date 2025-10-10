import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  constructor(public languageService: LanguageService, private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
