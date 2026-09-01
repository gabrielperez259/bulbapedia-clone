import { Route } from '@angular/router';

export const MOVE_DETAILS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./move-description/move-description').then((m) => m.MoveDescription),
  },{
    path: 'description',
    loadComponent: () => import('./move-description/move-description').then((m) => m.MoveDescription),
  },   
  
  {
    path: 'past-values',
    loadComponent: () => import('./past-values/past-values').then((m) => m.PastValues),
  },{
    path: 'contest',
    loadComponent: () => import('./contest/contest').then((m) => m.Contest),
  },{
    path: 'target',
    loadComponent: () => import('./target/target').then((m) => m.Target),    
  },{
    path: 'machines',
    loadComponent: () => import('./machines/machines').then((m) => m.Machines),
  },{
    path: 'flavor-text',
    loadComponent: () => import('./move-flavor-text/move-flavor-text').then((m) => m.MoveFlavorText),
  },{
    path: 'learn-by',
    loadComponent: () => import('./pokemons-with-move/pokemons-with-move').then((m) => m.PokemonsWithMove),
  },{
    path: 'machines',
    loadComponent: () => import('./machines/machines').then((m) => m.Machines),
  }

];