import { Component, signal } from '@angular/core';
import { MediaCardComponent } from '@shared/components/media-card/media-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MediaCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly mediaItems = signal([
    {
      id: 1,
      title: 'The Good Doctor',
      date: 'Sep 25, 2017',
      rating: 85,
      image: 'medical-drama-poster.png',
    },
    {
      id: 2,
      title: 'Rick and Morty',
      date: 'Dec 02, 2013',
      rating: 87,
      image: 'animated-sci-fi-show-poster.jpg',
    },
    {
      id: 3,
      title: 'My Fault',
      date: 'Jun 08, 2023',
      rating: 81,
      image: 'romantic-drama-movie-poster.jpg',
    },
    {
      id: 4,
      title: 'The Little Mermaid',
      date: 'Aug 25, 2023',
      rating: 66,
      image: 'mermaid-underwater-fantasy-poster.jpg',
    },
    {
      id: 5,
      title: 'John Wick: Chapter 4',
      date: 'Mar 24, 2023',
      rating: 78,
      image: 'action-movie-poster.png',
    },
    {
      id: 6,
      title: 'Family Guy',
      date: 'Jan 31, 1999',
      rating: 73,
      image: '/public/animated-comedy-show-poster.jpg',
    },
  ]);
}
