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
  constructor(private http: HttpClient) {}

  getpopular(page: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(`${this._baseUrl}movie/popular?page=${page}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getMoiveDetails(movieId: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(`${this._baseUrl}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getMoivesRecommendations(movieId: number): Observable<IMoviesResponse> {
    return this.http.get<IMoviesResponse>(`${this._baseUrl}/movie/${movieId}/recommendations`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
  getMultiSearch(searchString: string): Observable<IMovieDetailsResponse> {
    return this.http.get<IMovieDetailsResponse>(`${this._baseUrl}/search/multi${searchString}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
      },
    });
  }
}
