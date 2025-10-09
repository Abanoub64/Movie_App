import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
  IMovie,
  IMovieDetails,
  IMovieDetailsResponse,
  IMoviesResponse,
} from '@shared/interface/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _baseUrl: string = 'https://api.themoviedb.org/3/';
  public lang: string = 'en-US';
  constructor(private http: HttpClient) {}

  getpopular(page: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}movie/popular?page=${page}?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getMoiveDetails(movieId: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(`${this._baseUrl}/movie/${movieId}?language=${this.lang}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getMoivesRecommendations(movieId: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/movie/${movieId}/recommendations?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getMultiSearch(searchString: string): Observable<IMovieDetailsResponse> {
    return this.http.get<IMovieDetailsResponse>(
      `${this._baseUrl}/search/multi${searchString}?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getTrending(timeWindow: string): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/trending/all/${timeWindow}?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  gettop_ratedMovies(): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/movie/top_rated?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getupcomingMovies(): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(`${this._baseUrl}/movie/upcoming?language=${this.lang}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getNow_playingMovies(): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(
      `${this._baseUrl}/movie/now_playing?language=${this.lang}`,
      {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }
    );
  }
  getPopularMovies(): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(`${this._baseUrl}/movie/popular?language=${this.lang}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
}
