import { computed, Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Specie } from '../models/species/specie';

@Service()
export class PokemonSpeciesDetailsDataClient {
  public url = signal('');

  public pokemonSpeciesDetails = computed(() => this.#pokemonSpeciesDetailsResource.value());
  public varietiesNames = computed(() =>
    this.#pokemonSpeciesDetailsResource
      .value()
      ?.varieties.map((variety) => variety.pokemon.name as string),
  );
  public pokemonSpeciesDetailsLoading = computed(() =>
    this.#pokemonSpeciesDetailsResource.isLoading(),
  );
  public pokemonSpeciesDetailsError = computed(() => this.#pokemonSpeciesDetailsResource.error());

  readonly #pokemonSpeciesDetailsResource = httpResource<Specie>(() => ({
    url: this.url(),
    forceCache: true,
    responseType: 'json',
    method: 'GET',
  }));
}
