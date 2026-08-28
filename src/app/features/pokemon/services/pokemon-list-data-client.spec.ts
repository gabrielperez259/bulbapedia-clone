import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../../../environments/environment';
import { GenValues } from '../../../shared/utils/gen-values';
import { PokemonListDataClient, TOTAL_POKEMON } from './pokemon-list-data-client';

describe('PokemonListDataClient', () => {
  let dataClient: PokemonListDataClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonListDataClient, provideHttpClient(), provideHttpClientTesting()],
    });

    dataClient = TestBed.inject(PokemonListDataClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('starts with generation 1 and page 1', () => {
    expect(dataClient.selectedGeneration()).toBe(GenValues.GenOne);
    expect(dataClient.currentPage()).toBe(1);
  });

  it('loads the Pokémon for the selected generation and current page', async () => {
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });

    dataClient.setGeneration(GenValues.GenThree);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=251&limit=20`).flush({
      results: [{ name: 'treecko', url: 'https://pokeapi.co/api/v2/pokemon/252/' }],
    });

    dataClient.setPage(2);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=271&limit=20`).flush({
      results: [{ name: 'electrike', url: 'https://pokeapi.co/api/v2/pokemon/309/' }],
    });
    await TestBed.inject(ApplicationRef).whenStable();

    expect(dataClient.pokemonList().map((pokemon) => pokemon.name)).toEqual(['electrike']);
  });

  it('resets the page when the generation changes', () => {
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });

    dataClient.setPage(2);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=20&limit=20`).flush({ results: [] });

    dataClient.setGeneration(GenValues.GenThree);

    expect(dataClient.currentPage()).toBe(1);
    expect(dataClient.selectedGeneration()).toBe(GenValues.GenThree);
  });

  it('searches across all generations instead of the selected generation', async () => {
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });

    dataClient.setGeneration(GenValues.GenThree);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=251&limit=20`).flush({ results: [] });

    dataClient.setSearchTerm('Char');
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=${TOTAL_POKEMON}`).flush({
      results: [
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
        { name: 'charcadet', url: 'https://pokeapi.co/api/v2/pokemon/935/' },
        { name: 'treecko', url: 'https://pokeapi.co/api/v2/pokemon/252/' },
      ],
    });
    await TestBed.inject(ApplicationRef).whenStable();

    expect(dataClient.isSearching()).toBe(true);
    expect(dataClient.selectedGeneration()).toBe(GenValues.GenThree);
    expect(dataClient.filteredPokemonList().map((pokemon) => pokemon.name)).toEqual([
      'charmander',
      'charizard',
      'charcadet',
    ]);
  });
});
