import { Component, inject } from '@angular/core';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
 languageService = inject(LanguageService);
}
