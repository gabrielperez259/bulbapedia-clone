import { inject, Injectable, signal } from '@angular/core';
import { PokemonResource } from '../resources/pokemon-resource';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataCLient {

  private search = signal('Gengar')
  private pokemonResource = inject(PokemonResource);
  pokemons = this.pokemonResource.search(this.search);

}
