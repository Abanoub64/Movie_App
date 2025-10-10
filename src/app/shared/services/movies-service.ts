import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
  IMovie,
  IMovieDetails,
  IMovieDetailsResponse,
  IMoviesResponse,
  TrailerResponse,
} from '@shared/interface/interfaces';
import { Observable } from 'rxjs';
import { LanguageService } from './language-service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _baseUrl: string = 'https://api.themoviedb.org/3/';
  public lang: string = 'en-US';
  private languageService = inject(LanguageService);
  constructor(private http: HttpClient) {}

  getpopular(page: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}movie/popular?page=${page}?language=${language}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getMoiveDetails(movieId: number): Observable<IMovieDetails> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMovieDetails>(`${this._baseUrl}movie/${movieId}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getMoivesRecommendations(movieId: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}movie/${movieId}/recommendations?language=${language}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  } //search/multi?query=fggrgfweffffes&include_adult=false&language=en-US&page=1
  getMultiSearch(searchString: string): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}search/multi?query=${searchString}&include_adult=false?language=${language}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getTrending(timeWindow: string): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}trending/all/${timeWindow}?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  gettop_ratedMovies(page: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/movie/top_rated?language=${this.lang}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getupcomingMovies(page: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/movie/upcoming?language=${language}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getNow_playingMovies(page: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/movie/now_playing?language=${language}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getMovieTrailer(movieId: number): Observable<TrailerResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<TrailerResponse>(
      `${this._baseUrl}movie/${movieId}/videos?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getPopularMovies(page: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/movie/popular?language=${language}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
}
