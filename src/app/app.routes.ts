import { Routes } from '@angular/router';

import { Home } from '@shared/pages/home/home';
import { Login } from '@shared/pages/login/login';
import { Register } from '@shared/pages/register/register';
import { WishList } from '@shared/pages/wish-list/wish-list';
import { Details } from '@shared/pages/details/details';
import { MyListsPage } from './features/lists/my-lists-page/my-lists-page';
import { CreateListPage } from './features/lists/create-list-page/create-list-page';
import { ListDetailsPage } from './features/lists/list-details-page/list-details-page';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'home', component: Home },
  { path: 'wishlist', component: WishList },
  { path: 'movie/:id', component: Details },

  { path: 'lists', component: MyListsPage },           
  { path: 'lists/create', component: CreateListPage }, 
  { path: 'lists/:id', component: ListDetailsPage },    
  { path: '**', redirectTo: 'login' },
];
