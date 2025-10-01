import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZardDemoButtonDefaultComponent } from '@shared/components/button-sec/button-sec';
import { Footer } from '@shared/components/footer/footer';
import { HeroSection } from '@shared/components/hero-section/hero-section';
import { MovieCard } from '@shared/components/movie-card/movie-card';
import { Navbar } from '@shared/components/navbar/navbar';
import { ZardDemoPaginationComponent } from '@shared/components/pagination/pagination';
import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { Home } from '@shared/pages/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroSection, Footer, ZardPaginationComponent, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('movie_app');
}
