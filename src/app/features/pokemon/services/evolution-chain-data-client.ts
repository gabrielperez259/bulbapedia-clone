import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { EvolutionChain } from '../models/evolution/evolution';

@Injectable({
  providedIn: 'root',
})
export class EvolutionChainDataClient {
  public pokemonDetails = computed(() => this.#pokemonDeatilsResource.value());
  public pokemonDetailsLoading = computed(() => this.#pokemonDeatilsResource.isLoading());
  public pokemonDetailsError = computed(() => this.#pokemonDeatilsResource.error());

  public evolutionChainUrl = signal<string>('');
  readonly #pokemonDeatilsResource = httpResource<EvolutionChain>(() => ({
    url: `${this.evolutionChainUrl()}`,
    responseType: 'json',
    method: 'GET',
  }));
}
