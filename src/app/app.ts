import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZardDemoButtonDefaultComponent } from '@shared/components/button-sec/button-sec';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ZardDemoButtonDefaultComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('movie_app');
}
