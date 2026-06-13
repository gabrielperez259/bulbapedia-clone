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
  public pokemonName = computed(() => this.#pokemonDeatilsResource.value()?.name);
  public pokemonIsDefault = computed(() => this.#pokemonDeatilsResource.value()?.is_default);

  readonly #pokemonDeatilsResource = httpResource<Pokemon>(() => ({
    url: `${this.#url}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    cache: 'force-cache',
  }));
}
