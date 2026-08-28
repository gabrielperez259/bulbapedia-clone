import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GENERATION_RANGES, GenValues } from '../../../shared/utils/gen-values';
import { PokemonPayload } from '../models/pokemon-payload';

interface PokemonListState {
  generation: GenValues;
  page: number;
  searchTerm: string;
}

export const POKEMON_PAGE_SIZE = 20;
export const TOTAL_POKEMON = Object.values(GENERATION_RANGES).reduce(
  (total, generation) => total + generation.total,
  0,
);

@Injectable()
export class PokemonListDataClient {
  readonly #url = environment.apiUrl;
  readonly #initialState: PokemonListState = {
    generation: GenValues.GenOne,
    page: 1,
    searchTerm: '',
  };
  readonly #state = signal<PokemonListState>(this.#initialState);

  readonly selectedGeneration = computed(() => this.#state().generation);
  readonly currentPage = computed(() => this.#state().page);
  readonly searchTerm = computed(() => this.#state().searchTerm);
  readonly isSearching = computed(() => this.searchTerm().length > 0);
  readonly totalPages = computed(() =>
    Math.ceil(GENERATION_RANGES[this.selectedGeneration()].total / POKEMON_PAGE_SIZE),
  );

  readonly pokemonList = computed(() => this.#pokemonListResource.value()?.results ?? []);
  readonly filteredPokemonList = computed(() => {
    const searchTerm = this.searchTerm();

    return searchTerm
      ? this.pokemonList().filter((pokemon) => pokemon.name.includes(searchTerm))
      : this.pokemonList();
  });
  readonly pokemonListLoading = computed(() => this.#pokemonListResource.isLoading());
  readonly pokemonListError = computed(() => this.#pokemonListResource.error());

  setGeneration(generation: GenValues) {
    this.#state.update((state) => ({ ...state, generation, page: 1 }));
  }

  setPage(page: number) {
    this.#state.update((state) => ({
      ...state,
      page: Math.min(Math.max(page, 1), this.totalPages()),
    }));
  }

  setSearchTerm(searchTerm: string) {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (normalizedSearchTerm === this.searchTerm()) {
      return;
    }

    this.#state.update((state) => ({ ...state, searchTerm: normalizedSearchTerm }));
  }

  readonly #pokemonListResource = httpResource<PokemonPayload>(() => ({
    url: this.#buildUrl(),
    responseType: 'json',
    method: 'GET',
  }));

  #buildUrl() {
    if (this.isSearching()) {
      return `${this.#url}?offset=0&limit=${TOTAL_POKEMON}`;
    }

    const range = GENERATION_RANGES[this.selectedGeneration()];
    const offsetInGeneration = (this.currentPage() - 1) * POKEMON_PAGE_SIZE;
    const limit = Math.min(POKEMON_PAGE_SIZE, range.total - offsetInGeneration);

    return `${this.#url}?offset=${range.offset + offsetInGeneration}&limit=${limit}`;
  }
}
