import { Route } from '@angular/router';
import { PokemonList } from '../pages/pokemon-list/pokemon-list';
import { Pokemon } from '../pages/pokemon-list/pokemon/pokemon';

export const POKEMON_ROUTES : Route[] = [
    {
        path: '',
        component: PokemonList
    },
    {
        path: ':name',
        component: Pokemon
    }
]