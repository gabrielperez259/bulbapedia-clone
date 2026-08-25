import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PokemonStats } from './pokemon-stats';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';

describe('PokemonStats', () => {
  let component: PokemonStats;
  let fixture: ComponentFixture<PokemonStats>;

  const mockPokemonDetailsDataClient = {
    pokemonDetails: signal({
      id: 1,
      name: 'bulbasaur',
      stats: [
        { base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } },
        { base_stat: 49, effort: 0, stat: { name: 'attack', url: '' } },
      ],
    }),
    pokemonDetailsLoading: signal(false),
    pokemonDetailsError: signal(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonStats],
      providers: [
        {
          provide: PokemonDetailsDataClient,
          useValue: mockPokemonDetailsDataClient,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve stats from PokemonDetailsDataClient', () => {
    expect(component.stats().length).toBe(2);
    expect(component.stats()[0].stat.name).toBe('hp');
  });
});
