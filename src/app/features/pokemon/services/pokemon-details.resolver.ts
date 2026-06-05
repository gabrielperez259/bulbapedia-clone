import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { inject } from '@angular/core';
import { PokemonDetailsDataClient } from './pokemon-details.data-client';

export const pokemonDetailsResolver: ResolveFn<Pokemon | undefined> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
  const data = inject(PokemonDetailsDataClient);
  data.search.set(route.params['name']);
  return data.pokemonDetails();
};
