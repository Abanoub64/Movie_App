import { Component } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-hero-section',
  imports: [SearchBar],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {}
