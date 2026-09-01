import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/pokemon/routes/pokemon.route').then((m) => m.POKEMON_ROUTES),
  },
  {
    path: 'ability',
    loadChildren: () =>
      import('../app/features/pokemon/pages/abiltity/ability.route').then(
        (m) => m.ABILITY_ROUTE,
      ),
  },
  {
    path: 'move',
    loadChildren: () =>
      import('./features/pokemon/pages/moves/move.route').then((m) => m.MOVE_ROUTE),
  },
];
