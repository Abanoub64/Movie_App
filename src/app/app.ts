import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@shared/components/footer/footer';
import { HeroSection } from '@shared/components/hero-section/hero-section';
import { Navbar } from '@shared/components/navbar/navbar';

import { Home } from '@shared/pages/home/home';
import { Details } from '@shared/pages/details/details';
import { TrailerPlayerComponent } from '@shared/components/trailer-player/trailer-player';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroSection, Footer, Home, Details, TrailerPlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('movie_app');
}
