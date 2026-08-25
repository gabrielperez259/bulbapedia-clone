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

  it('should generate spriteList correctly from details', () => {
    const list = component.spriteList();
    expect(list.length).toBe(5);
    expect(list[0]).toEqual({
      url: 'artwork_url',
      label: 'Official Artwork',
      category: 'artwork',
    });
    expect(list[1]).toEqual({
      url: 'front_default_url',
      label: 'Front Default',
      category: 'default',
    });
  });
});
