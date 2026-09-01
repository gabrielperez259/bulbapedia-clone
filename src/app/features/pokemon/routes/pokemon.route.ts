import { Route } from '@angular/router';

export const POKEMON_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('../pages/pokemon-list/pokemon-list').then((m) => m.PokemonList),
  },
  {
    path: ':name',
    loadComponent: () =>
      import('../pages/pokemon-details/pokemon-details').then((m) => m.PokemonDetails),
    loadChildren: () =>
      import('../pages/pokemon-details/pokemon-details.routes.').then(
        (m) => m.POKEMON_DETAILS_ROUTES,
      ),
  },
];
