import { Routes } from '@angular/router';

import { Home } from '@shared/pages/home/home';
import { Login } from '@shared/pages/login/login';
import { Register } from '@shared/pages/register/register';
import { WishList } from '@shared/pages/wish-list/wish-list';
import { Details } from '@shared/pages/details/details';
import { MyListsPage } from './features/lists/my-lists-page/my-lists-page';
import { CreateListPage } from './features/lists/create-list-page/create-list-page';
import { ListDetailsPage } from './features/lists/list-details-page/list-details-page';

import { Search } from '@shared/pages/search/search';
import { NotFound } from '@shared/pages/not-found/not-found';
import { AiringTodayV } from '@shared/pages/TV/airing-today-v/airing-today-v';
import { PopulerTV } from '@shared/pages/TV/populer-tv/populer-tv';
import { TopRatedTV } from '@shared/pages/TV/top-rated-tv/top-rated-tv';
import { OnTV } from '@shared/pages/TV/on-tv/on-tv';
import { NowPlayingMovies } from '@shared/pages/movies/now-playing-movies/now-playing-movies';
import { UpComingMovies } from '@shared/pages/movies/up-coming-movies/up-coming-movies';
import { TopRatedMovies } from '@shared/pages/movies/top-rated-movies/top-rated-movies';
import { PopulerMovies } from '@shared/pages/movies/populer-movies/populer-movies';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'wishlist', component: WishList },
  { path: 'movie/populer', component: PopulerMovies },
  { path: 'movie/nowplaying', component: NowPlayingMovies },
  { path: 'movie/toprated', component: TopRatedMovies },
  { path: 'movie/upcoming', component: UpComingMovies },
  { path: 'movie/:id', component: Details },
  { path: 'tv/airing', component: AiringTodayV },
  { path: 'tv/populer', component: PopulerTV },
  { path: 'tv/toprated', component: TopRatedTV },
  { path: 'tv/ontv', component: OnTV },
  { path: 'tv/:id', component: Details },
  { path: 'search', component: Search },
  { path: 'lists', component: MyListsPage },
  { path: 'lists/create', component: CreateListPage },
  { path: 'tvshows/airing', component: AiringTodayV },
  { path: 'lists/:id', component: ListDetailsPage },
  { path: '**', component: NotFound },
];
