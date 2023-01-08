import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./app/components/todo-list-host/todo-list-host.component'),
  },
  {
    path: 'typescript',
    loadComponent: () => import('@ts-tricks').then((module) => module.TypescriptTricksComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
