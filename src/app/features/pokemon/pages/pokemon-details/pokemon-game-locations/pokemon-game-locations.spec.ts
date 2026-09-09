import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PokemonGameLocations } from './pokemon-game-locations';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { LocationAreaEncountersDataClient } from '../../../services/location-area-encounters-data-client';

describe('PokemonGameLocations', () => {
  let component: PokemonGameLocations;
  let fixture: ComponentFixture<PokemonGameLocations>;

  const mockPokemonDetailsDataClient = {
    pokemonLocationAreaEncountersUrl: signal('https://pokeapi.co/api/v2/pokemon/25/encounters'),
    pokemonMoveVersionGroupNames: signal<string[]>([]),
  };

  const mockLocationAreaEncountersDataClient = {
    url: signal(''),
    encountersLoading: signal(false),
    encountersError: signal(false),
    encounters: signal([
      {
        location_area: { name: 'viridian-forest-area', url: '' },
        version_details: [
          { version: { name: 'red', url: '' }, max_chance: 100, encounter_details: [] },
          { version: { name: 'gold', url: '' }, max_chance: 100, encounter_details: [] },
        ],
      },
      {
        location_area: { name: 'power-plant-area', url: '' },
        version_details: [
          { version: { name: 'red', url: '' }, max_chance: 100, encounter_details: [] },
        ],
      },
    ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonGameLocations],
      providers: [
        provideRouter([]),
        { provide: PokemonDetailsDataClient, useValue: mockPokemonDetailsDataClient },
        {
          provide: LocationAreaEncountersDataClient,
          useValue: mockLocationAreaEncountersDataClient,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonGameLocations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group encounters correctly into Generation I and Generation II', () => {
    const groups = component.generationGroups();
    expect(groups.length).toBe(2);

    expect(groups[0].generationTitle).toBe('Generation I');
    expect(groups[0].games[0].gameName).toBe('red');
    expect(groups[0].games[0].locations).toContain('viridian-forest-area');
    expect(groups[0].games[0].locations).toContain('power-plant-area');

    expect(groups[1].generationTitle).toBe('Generation II');
    expect(groups[1].games[0].gameName).toBe('gold');
    expect(groups[1].games[0].locations).toContain('viridian-forest-area');
  });

  it('should add evolve/trade entries for move version groups not covered by encounters', () => {
    mockPokemonDetailsDataClient.pokemonMoveVersionGroupNames.set([
      'red-blue',      // 'red' is already covered → skip
      'gold-silver',   // 'gold' is already covered → skip
      'ruby-sapphire', // neither 'ruby' nor 'sapphire' in encounters → add with evolve/trade
    ]);
    fixture.detectChanges();

    const groups = component.generationGroups();
    const gen3 = groups.find((g) => g.generationTitle === 'Generation III');

    expect(gen3).toBeDefined();
    expect(gen3!.games.some((g) => g.gameName === 'ruby')).toBe(true);
    expect(gen3!.games.some((g) => g.gameName === 'sapphire')).toBe(true);
    expect(gen3!.games.find((g) => g.gameName === 'ruby')?.locations).toContain('evolve/trade');
    expect(gen3!.games.find((g) => g.gameName === 'sapphire')?.locations).toContain('evolve/trade');
  });

  it('should NOT add evolve/trade when at least one version of the group is covered', () => {
    mockPokemonDetailsDataClient.pokemonMoveVersionGroupNames.set([
      'red-blue', // 'red' is in encounters → entire group is considered covered
    ]);
    fixture.detectChanges();

    const groups = component.generationGroups();
    const gen1 = groups.find((g) => g.generationTitle === 'Generation I');

    // 'blue' should NOT be added as evolve/trade because 'red' is already covered
    expect(gen1!.games.some((g) => g.gameName === 'blue')).toBe(false);
  });

  it('should return empty array when there are no encounters and no move version groups', () => {
    mockLocationAreaEncountersDataClient.encounters.set([]);
    mockPokemonDetailsDataClient.pokemonMoveVersionGroupNames.set([]);
    fixture.detectChanges();

    expect(component.generationGroups()).toEqual([]);
  });
});
