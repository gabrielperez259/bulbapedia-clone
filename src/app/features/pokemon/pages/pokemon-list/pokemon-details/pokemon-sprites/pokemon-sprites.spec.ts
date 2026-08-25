import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PokemonSprites } from './pokemon-sprites';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';

describe('PokemonSprites', () => {
  let component: PokemonSprites;
  let fixture: ComponentFixture<PokemonSprites>;

  const mockPokemonDetailsDataClient = {
    pokemonDetails: signal({
      id: 1,
      name: 'bulbasaur',
      sprites: {
        front_default: 'front_default_url',
        back_default: 'back_default_url',
        front_shiny: 'front_shiny_url',
        back_shiny: 'back_shiny_url',
        other: {
          'official-artwork': {
            front_default: 'artwork_url',
          },
        },
      },
    }),
    pokemonDetailsLoading: signal(false),
    pokemonDetailsError: signal(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSprites],
      providers: [
        {
          provide: PokemonDetailsDataClient,
          useValue: mockPokemonDetailsDataClient,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonSprites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate generationGroups with Official Artwork and Default groups', () => {
    const groups = component.generationGroups();
    // Deve ter pelo menos o grupo 'Official Artwork' e 'Default & Latest Sprites'
    expect(groups.length).toBeGreaterThanOrEqual(2);

    const artworkGroup = groups.find((g) => g.generationTitle === 'Official Artwork');
    expect(artworkGroup).toBeTruthy();
    expect(artworkGroup!.sprites[0].url).toBe('artwork_url');
    expect(artworkGroup!.sprites[0].label).toBe('Official Artwork');

    const defaultGroup = groups.find((g) => g.generationTitle === 'Default & Latest Sprites');
    expect(defaultGroup).toBeTruthy();
    const frontDefault = defaultGroup!.sprites.find((s) => s.label === 'Front Default');
    expect(frontDefault?.url).toBe('front_default_url');
  });
});
