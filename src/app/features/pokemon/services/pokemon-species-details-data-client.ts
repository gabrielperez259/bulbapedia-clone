import { computed, Service, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { Specie } from '../models/species/specie';

@Service()
export class PokemonSpeciesDetailsDataClient {
  #url = environment.speciesUrl;

  public search = signal('');

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
    url: `${this.#url}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    cache: 'force-cache',
    // usando default value para evitar undefined já que sinal não é filtrado por um loading
    defaultValue: {
      name: '',
      evolves_from_species: '',
      evolution_chain: '',
      varieties: [],
    },
  }));
}
