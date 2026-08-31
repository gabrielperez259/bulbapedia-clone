import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsCard } from './pokemon-details-card';
import { Component, inputBinding, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Pokemon } from '../../../models/pokemon';

describe('PokemonDetailsCard', () => {
  @Component({ selector: 'app-ability', template: '' })
  class AbilityStub {}
  @Component({ selector: 'app-card', template: '' })
  class CardStub {}
  @Component({ selector: 'app-index-number', template: '' })
  class IndexNumberStub {}
  @Component({ selector: 'app-name', template: '' })
  class NameStub {}
  @Component({ selector: 'app-sprite', template: '' })
  class SpriteStub {}
  @Component({ selector: 'app-types', template: '' })
  class TypesStub {}

  let component: PokemonDetailsCard;
  let fixture: ComponentFixture<PokemonDetailsCard>;
  let pokemon = signal<Pokemon | null>(null);
  const createPokemonMock = (typeName: string): Pokemon => ({
    id: 1,
    name: 'bulbasaur',
    is_default: true,
    location_area_encounters: '',
    species: {
      name: 'bulbasaur',
      url: '',
    },
    sprites: {} as Pokemon['sprites'],
    stats: [],
    moves: [],
    types: [
      {
        slot: 1,
        type: {
          name: typeName,
          url: '',
        },
      },
    ],
    abilities: [],
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonDetailsCard,
        AbilityStub,
        CardStub,
        IndexNumberStub,
        NameStub,
        SpriteStub,
        TypesStub,
      ],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsCard, {
      bindings: [inputBinding('pokemon', pokemon)],
    });
    component = fixture.componentInstance;
  });

  it('should set background color based on the pokemon first type', async () => {
    
    pokemon.set(createPokemonMock('fire'));
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const container = fixture.nativeElement.querySelector('.pokemon-details-card-container');
    expect(container.style.backgroundColor).toBe('rgb(238, 129, 48)');
  });
});
