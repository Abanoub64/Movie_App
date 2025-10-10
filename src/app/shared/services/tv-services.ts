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
export class TvServices {
  private _baseUrl: string = 'https://api.themoviedb.org/3/';
  private languageService = inject(LanguageService);
  public languge = this.languageService.currentLanguage();
  constructor(private http: HttpClient) {}

  getTVpopular(page: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}tv/popular?language=${this.languge}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  // tv/{series_id}/recommendations
  getTvRecommendations(movieId: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/tv/${movieId}/recommendations?language=${this.languge}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getTvTrailer(movieId: number): Observable<TrailerResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<TrailerResponse>(`${this._baseUrl}tv/${movieId}/videos`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getTVDetails(movieId: number): Observable<IMovieDetails> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMovieDetails>(`${this._baseUrl}tv/${movieId}?language=${this.languge}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getairing_today(page: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}tv/airing_today?language=${this.languge}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  gettop_ratedMovies(page: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}tv/top_rated?language=${this.languge}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  geton_tv(page: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}tv/on_the_air?language=${this.languge}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  //?language=${this.languge}&page=${page}
  getPopularMovies(page: number): Observable<IMoviesResponse> {
    const language = this.languageService.currentLanguage();
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}tv/popular?language=${this.languge}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
}
