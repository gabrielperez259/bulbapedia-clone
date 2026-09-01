export const MOVE_ROUTE = [
  {
    path: ':name',
    loadComponent: () => import('./move-details/move-details').then((m) => m.MoveDetails),
  },
];
