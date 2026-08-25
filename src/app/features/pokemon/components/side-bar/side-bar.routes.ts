import { Route } from '@angular/router';

export const SIDEBAR_ROUTES: Route[] = [
  {
    path: 'stats',
    loadComponent: () =>
      import('../../pages/pokemon-list/pokemon-details/pokemon-stats/pokemon-stats').then(
        (m) => m.PokemonStats,
      ),
  },
  {
    path: 'moves',
    loadComponent: () =>
      import('../../pages/pokemon-list/pokemon-details/pokemon-move-list/pokemon-move-list').then(
        (m) => m.PokemonMoveList,
      ),
  },
  {
    path: 'evolution',
    loadComponent: () =>
      import('../../pages/pokemon-list/pokemon-details/pokemon-evolutions/pokemon-evolutions').then(
        (m) => m.PokemonEvolutions,
      ),
  },
  {
    path: 'sprites',
    loadComponent: () =>
      import('../../pages/pokemon-list/pokemon-details/pokemon-sprites/pokemon-sprites').then(
        (m) => m.PokemonSprites,
      ),
  },
];
