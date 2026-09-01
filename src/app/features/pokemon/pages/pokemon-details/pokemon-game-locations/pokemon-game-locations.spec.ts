import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PokemonGameLocations } from './pokemon-game-locations';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { LocationAreaEncountersDataClient } from '../../../services/location-area-encounters-data-client';

describe('PokemonGameLocations', () => {
  let component: PokemonGameLocations;
  let fixture: ComponentFixture<PokemonGameLocations>;

  const mockPokemonDetailsDataClient = {
    pokemonLocationAreaEncountersUrl: signal('https://pokeapi.co/api/v2/pokemon/25/encounters'),
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
});
