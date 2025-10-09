import { Component, inject } from '@angular/core';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-button-with-menu',
  imports: [],
  templateUrl: './button-with-menu.html',
  styleUrl: './button-with-menu.css'
})
export class ButtonWithMenu {
languageService = inject(LanguageService);
}
