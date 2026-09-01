import { Route } from '@angular/router';

export const POKEMON_DETAILS_ROUTES: Route[] = [
  {
    path: 'stats',
    loadComponent: () => import('./pokemon-stats/pokemon-stats').then((m) => m.PokemonStats),
  },
  {
    path: 'moves',
    loadComponent: () =>
      import('./pokemon-move-list/pokemon-move-list').then((m) => m.PokemonMoveList),
  },
  {
    path: 'evolution',
    loadComponent: () =>
      import('./pokemon-evolutions/pokemon-evolutions').then((m) => m.PokemonEvolutions),
  },
  {
    path: 'sprites',
    loadComponent: () => import('./pokemon-sprites/pokemon-sprites').then((m) => m.PokemonSprites),
  },
  {
    path: 'locations',
    loadComponent: () =>
      import('./pokemon-game-locations/pokemon-game-locations').then((m) => m.PokemonGameLocations),
  },
];
