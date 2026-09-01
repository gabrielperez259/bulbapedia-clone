export const MOVE_ROUTE = [
  {
    path: ':name',
    loadComponent: () => import('./move-details/move-details').then((m) => m.MoveDetailsComponent),
    loadChildren: () => import('./move-details.route').then((m) => m.MOVE_DETAILS_ROUTES),
  },
];
