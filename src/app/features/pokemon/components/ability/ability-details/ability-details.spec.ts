import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, signal } from '@angular/core';

import { AbilityDetails } from './ability-details';
import { AbilityDataClient } from '../../../services/ability-data-client';
import { Pokemon } from '../../../models/pokemon';
import { provideRouter } from '@angular/router';
import { AbilityFlavorTextEntry } from '../../../models/abilities/ability';

describe('AbilityDetails', () => {
  let component: AbilityDetails;
  let fixture: ComponentFixture<AbilityDetails>;
  let compiled: HTMLElement;

  const abilityName = signal('');

  const abilityDataDetailsMock = {
    abilityName: signal(''),
    abilityDetailsLoading: signal(false),
    abilityDetailsError: signal(false),
    pokemonsWithAbility: signal<Pokemon['abilities']>([]),
    abilityFlavorText: signal<AbilityFlavorTextEntry[]>([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityDetails],
      providers: [
        {
          provide: AbilityDataClient,
          useValue: abilityDataDetailsMock,
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AbilityDetails, {
      bindings: [inputBinding('abilityName', abilityName)],
    });

    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ability name from the service in the h1', async () => {
    const h1: HTMLHeadingElement = fixture.nativeElement.querySelector('h1');

    abilityDataDetailsMock.abilityName.set('overgrow');
    await fixture.whenStable();

    expect(h1.textContent).toContain('Overgrow');
  });

  it('should render the ability name from the service in the h2', async () => {
    const h2: HTMLHeadingElement = fixture.nativeElement.querySelector('h2');

    abilityDataDetailsMock.abilityName.set('overgrow');
    await fixture.whenStable();

    expect(h2.textContent).toContain('Overgrow');
  });

  it('should render the pokemon list when pokemons with ability exist', async () => {
    abilityDataDetailsMock.pokemonsWithAbility.set([
      {
        is_hidden: false,
        slot: 1,
        ability: {
          name: 'overgrow',
          url: 'https://pokeapi.co/api/v2/ability/65/',
        },
      },
    ]);

    await fixture.whenStable();

    const list = fixture.nativeElement.querySelector('ul');

    expect(list).toBeTruthy();
  });

  it('should render the empty message when no pokemon has the ability', async () => {
    abilityDataDetailsMock.pokemonsWithAbility.set([]);

    await fixture.whenStable();

    const message = fixture.nativeElement.querySelector('.pokemon-list-container p');

    expect(message?.textContent).toContain('Nenhum Pokémon encontrado com esta habilidade.');
  });
  it('should render a pokemon-list-item for each pokemon', async () => {
    abilityDataDetailsMock.pokemonsWithAbility.set([
      {
        is_hidden: false,
        slot: 1,
        ability: {
          name: 'overgrow',
          url: 'https://pokeapi.co/api/v2/ability/65/',
        },
      },
      {
        is_hidden: false,
        slot: 1,
        ability: {
          name: 'blaze',
          url: 'https://pokeapi.co/api/v2/ability/67/',
        },
      },
    ]);

    await fixture.whenStable();
    const pokemonItems = fixture.nativeElement.querySelectorAll('app-pokemon-list-item');
    expect(pokemonItems.length).toBe(2);
  });

  it('should render the empty message when no flavor text is available', async () => {
    abilityDataDetailsMock.abilityFlavorText.set([]);

    await fixture.whenStable();

    const message = fixture.nativeElement.querySelector('.flavor-text-container p');

    expect(message?.textContent).toContain('Nenhuma descrição disponível para esta habilidade.');
  });

  it('should render the flavor text grid when flavor text exists', async () => {
    abilityDataDetailsMock.abilityFlavorText.set([
      {
        flavor_text: 'Boosts the power of Grass-type moves.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/',
        },
        version_group: {
          name: 'red-blue',
          url: 'https://pokeapi.co/api/v2/version-group/1/',
        },
      },
    ]);

    await fixture.whenStable();

    const grid = fixture.nativeElement.querySelector('.flavor-grid');

    expect(grid).toBeTruthy();
  });

  it('should render the flavor text version and description', async () => {
    abilityDataDetailsMock.abilityFlavorText.set([
      {
        flavor_text: 'Boosts the power of Grass-type moves.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/',
        },
        version_group: {
          name: 'red-blue',
          url: 'https://pokeapi.co/api/v2/version-group/1/',
        },
      },
    ]);

    await fixture.whenStable();

    const version = fixture.nativeElement.querySelector('.version-title');
    const flavorText = fixture.nativeElement.querySelector('.version-text');

    expect(version?.textContent).toContain('red-blue');
    expect(flavorText?.textContent).toContain('Boosts the power of Grass-type moves.');
  });

  it('should render a flavor card for each flavor text entry', async () => {
    abilityDataDetailsMock.abilityFlavorText.set([
      {
        flavor_text: 'Boosts the power of Grass-type moves.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/',
        },
        version_group: {
          name: 'red-blue',
          url: 'https://pokeapi.co/api/v2/version-group/1/',
        },
      },
      {
        flavor_text: 'Boosts the power of Grass-type moves.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/',
        },
        version_group: {
          name: 'gold-silver',
          url: 'https://pokeapi.co/api/v2/version-group/3/',
        },
      },
    ]);

    await fixture.whenStable();

    const cards = fixture.nativeElement.querySelectorAll('.flavor-card');

    expect(cards.length).toBe(2);
  });
  it('should render the loading message when ability details are loading', async () => {
    abilityDataDetailsMock.abilityDetailsLoading.set(true);

    await fixture.whenStable();

    const message = fixture.nativeElement.querySelector('.loading-spinner p');

    expect(message?.textContent).toContain('Carregando detalhes da habilidade...');
  });

  it('should render the error message when loading ability details fails', async () => {
    abilityDataDetailsMock.abilityDetailsLoading.set(false);
    abilityDataDetailsMock.abilityDetailsError.set(true);

    await fixture.whenStable();

    console.log('loading:', abilityDataDetailsMock.abilityDetailsLoading());
    console.log('error:', abilityDataDetailsMock.abilityDetailsError());
    console.log(fixture.nativeElement.innerHTML);

    const message = fixture.nativeElement.querySelector('.error-banner p');

    expect(message?.textContent).toContain(
      'Houve um erro ao carregar os dados desta habilidade. Verifique se o nome está correto.',
    );
  });
});
