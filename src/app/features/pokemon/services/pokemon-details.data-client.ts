import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonDetailsDataClient {
  #url = environment.apiUrl;

  public search = signal('');

  public pokemonDetails = computed(() => this.#pokemonDetailsResource.value());
  public pokemonDetailsLoading = computed(() => this.#pokemonDetailsResource.isLoading());
  public pokemonDetailsError = computed(() => this.#pokemonDetailsResource.error());
  public pokemonId = computed(() => this.#pokemonDetailsResource.value()?.id);
  public pokemonName = computed(() => this.#pokemonDetailsResource.value()?.name);
  public pokemonSpecieName = computed(() => this.#pokemonDetailsResource.value()?.species.name);
  public pokemonSpecieUrl = computed(() => this.#pokemonDetailsResource.value()?.species.url);
  public pokemonImage = computed(() => this.#pokemonDetailsResource.value()?.sprites?.other?.['official-artwork']?.front_default);
  public pokemonTypes = computed(() => this.#pokemonDetailsResource.value()?.types);
  public pokemonsStats = computed(() => this.#pokemonDetailsResource.value()?.stats);
  public pokemonAbilities = computed(() => this.#pokemonDetailsResource.value()?.abilities);
  public pokemonIsDefault = computed(() => this.#pokemonDetailsResource.value()?.is_default); 
  public pokemonLocationAreaEncountersUrl = computed(() => this.#pokemonDetailsResource.value()?.location_area_encounters);


  readonly #pokemonDetailsResource = httpResource<Pokemon>(() => ({
    url: `${this.#url}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    cache: 'force-cache',
    initialValue: {
      id: 0,
      name: '',
      location_area_encounters: '',
      species: {
        name: '',
        url: ''
      },
      sprites: {
        other: {
          'official-artwork': {
            front_default: ''
          }
        }
      },
      types: [],
      stats: [],
      abilities: [],
      is_default: false
    }
    
  }));
}
