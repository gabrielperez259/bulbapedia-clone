import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../../../environments/environment';
import { GenValues } from '../../../../shared/utils/gen-values';
import { TOTAL_POKEMON } from '../../services/pokemon-list-data-client';
import { PokemonList } from './pokemon-list';

describe('PokemonList', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with Gen 1 selected and page 1', async () => {
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });
    await fixture.whenStable();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const currentPage = fixture.nativeElement.querySelector('[data-testid="current-page"]');

    expect(select.value).toBe(GenValues.GenOne);
    expect(currentPage.textContent).toContain('Página 1');
  });

  it('updates the list and resets to page 1 when the generation changes', async () => {
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });

    component.data.setPage(2);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=20&limit=20`).flush({ results: [] });

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = GenValues.GenThree;
    select.dispatchEvent(new Event('change'));
    TestBed.tick();

    httpTesting.expectOne(`${environment.apiUrl}?offset=251&limit=20`).flush({
      results: [{ name: 'treecko', url: 'https://pokeapi.co/api/v2/pokemon/252/' }],
    });
    await fixture.whenStable();

    expect(component.data.currentPage()).toBe(1);
    expect(component.data.selectedGeneration()).toBe(GenValues.GenThree);
    expect(component.data.pokemonList().map((pokemon) => pokemon.name)).toEqual(['treecko']);
    expect(select.value).toBe(GenValues.GenThree);
  });

  it('loads the next page when the pagination changes', async () => {
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });
    await fixture.whenStable();

    const nextPage = fixture.nativeElement.querySelector(
      '[data-testid="next-page"]',
    ) as HTMLButtonElement;
    nextPage.click();
    TestBed.tick();

    httpTesting.expectOne(`${environment.apiUrl}?offset=20&limit=20`).flush({
      results: [{ name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' }],
    });
    await fixture.whenStable();

    expect(component.data.currentPage()).toBe(2);
    expect(component.data.pokemonList().map((pokemon) => pokemon.name)).toEqual(['metapod']);
  });

  it('shows global search results and hides pagination', async () => {
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });
    await fixture.whenStable();

    component.data.setGeneration(GenValues.GenThree);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=251&limit=20`).flush({ results: [] });

    component.data.setSearchTerm('char');
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=${TOTAL_POKEMON}`).flush({
      results: [
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'charcadet', url: 'https://pokeapi.co/api/v2/pokemon/935/' },
        { name: 'treecko', url: 'https://pokeapi.co/api/v2/pokemon/252/' },
      ],
    });
    await fixture.whenStable();

    expect(component.data.filteredPokemonList().map((pokemon) => pokemon.name)).toEqual([
      'charmander',
      'charcadet',
    ]);
    expect(fixture.nativeElement.querySelector('.pagination')).toBeNull();
  });
});
