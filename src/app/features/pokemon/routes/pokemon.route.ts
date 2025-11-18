import { Route } from '@angular/router';
import { PokemonList } from '../pages/pokemon-list/pokemon-list';
import { PokemonDetails } from '../pages/pokemon-list/pokemon-details/pokemon-details';
import { Stats } from '../components/stats/stats';

export const POKEMON_ROUTES : Route[] = [
    {
        path: '',
        loadComponent: () => import('../pages/pokemon-list/pokemon-list').then(m => m.PokemonList),
        
    },
    {
        path: ':name',
        loadComponent: () => import('../pages/pokemon-list/pokemon-details/pokemon-details').then(m => m.PokemonDetails),     
        loadChildren: () => import('../components/side-bar/side-bar.routes').then(m => m.SIDEBAR_ROUTES)
          
    }

        

  

]