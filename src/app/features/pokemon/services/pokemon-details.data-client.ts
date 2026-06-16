import { computed, Service, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';

@Service()
export class PokemonDetailsDataClient {
  #url = environment.apiUrl;

  public search = signal('');

  public pokemonDetails = computed(() => this.#pokemonDeatilsResource.value());
  public pokemonDetailsLoading = computed(() => this.#pokemonDeatilsResource.isLoading());
  public pokemonDetailsError = computed(() => this.#pokemonDeatilsResource.error());
  public pokemonId = computed(() => this.#pokemonDeatilsResource.value()?.id);
  public pokemonName = computed(() => this.#pokemonDeatilsResource.value()?.name);
  public pokemonSpecieName = computed(() => this.#pokemonDeatilsResource.value()?.species.name);
  public pokemonSpecieUrl = computed(() => this.#pokemonDeatilsResource.value()?.species.url);
  public pokemonImage = computed(() => this.#pokemonDeatilsResource.value()?.sprites.other['official-artwork'].front_default);
  public pokemonTypes = computed(() => this.#pokemonDeatilsResource.value()?.types);
  public pokemonsStats = computed(() => this.#pokemonDeatilsResource.value()?.stats);
  public pokemonAbilities = computed(() => this.#pokemonDeatilsResource.value()?.abilities);
  public pokemonIsDefault = computed(() => this.#pokemonDeatilsResource.value()?.is_default); 


  readonly #pokemonDeatilsResource = httpResource<Pokemon>(() => ({
    url: `${this.#url}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    cache: 'force-cache',
    initialValue: {
      id: 0,
      name: '',
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
