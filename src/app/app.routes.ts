import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/pokemon/routes/pokemon.route').then((m) => m.POKEMON_ROUTES),
  },{
      
    path: 'ability',
    loadChildren: () => 
    import('../app/features/pokemon/components/ability/ability.route').then((m) => m.ABILITY_ROUTE),
  }
  
];
