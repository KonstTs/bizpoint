import { Routes } from '@angular/router';

export const routes: Routes = [{ 
    path: '',
    loadComponent: () => import('./views/feed/feed.component').then(m => m.ktFeedComponent) 
},
// { 
//     path: 'about',
//     loadComponent: () => import('./views/about/about.component').then(m => m.ktAboutComponent) 
// },
{ 
    path: 'coins',
    loadComponent: () => import('./views/feed/feed.component').then(m => m.ktFeedComponent) 
}];
