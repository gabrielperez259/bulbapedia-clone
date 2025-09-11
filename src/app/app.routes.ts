import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./features/pokemon/routes/route').then( m => m.POKEMON_ROUTES),
      canActivateChild: [],
    }
];

