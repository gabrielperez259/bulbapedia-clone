import { Route } from '@angular/router';

export const MOVE_ROUTE: Route[] = [
  {
    path: '',
    loadComponent: () => import('./move-list/move-list').then((m) => m.MoveListComponent),
  },
  {
    path: ':name',
    loadComponent: () => import('./move-details/move-details').then((m) => m.MoveDetailsComponent),
    loadChildren: () => import('./move-details.route').then((m) => m.MOVE_DETAILS_ROUTES),
  },
];

