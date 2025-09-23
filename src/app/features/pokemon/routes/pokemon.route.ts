import { Route } from '@angular/router';
import { PokemonList } from '../pages/pokemon-list/pokemon-list';
import { PokemonDetails } from '../pages/pokemon-list/pokemon-details/pokemon-details';

export const POKEMON_ROUTES : Route[] = [
    {
        path: '',
        component: PokemonList
    },
    {
        path: ':name',
        component: PokemonDetails
    }
]