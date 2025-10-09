import { Routes } from '@angular/router';
import { Home } from '@shared/pages/home/home';
import { Login } from '@shared/pages/login/login';
import { Register } from '@shared/pages/register/register';
import { WishList } from '@shared/pages/wish-list/wish-list';
import { Details } from '@shared/pages/details/details';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home , },
  { path: 'wishlist', component: WishList },
  { path: 'movie/:id', component: Details },
  // { path: 'account', component: Account },
];
