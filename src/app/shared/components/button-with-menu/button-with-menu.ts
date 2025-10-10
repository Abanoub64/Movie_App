import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '@shared/services/language-service';

@Component({
  selector: 'app-button-with-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-with-menu.html',
  styleUrl: './button-with-menu.css',
})
export class ButtonWithMenu {
  languageService = inject(LanguageService);
}
