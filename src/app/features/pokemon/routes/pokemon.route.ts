import { Route } from '@angular/router';
import { PokemonList } from '../pages/pokemon-list/pokemon-list';
import { PokemonDetails } from '../pages/pokemon-list/pokemon/pokemon-details';

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