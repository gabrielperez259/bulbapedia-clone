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
        versions: {
          'generation-ix': {
            'scarlet-violet': {
              front_default: 'sv_front',
            },
          },
          'generation-i': {
            'red-blue': {
              front_default: 'rb_front',
              back_default: 'rb_back',
              front_shiny: null,
              back_shiny: null,
            },
            yellow: {
              front_default: null,
              back_default: null,
            },
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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group sprites by generation and game, omitting missing sprites', () => {
    const groups = component.generationGroups();

    expect(groups.map((group) => group.generationTitle)).toEqual([
      'Generation I',
      'Generation IX',
    ]);

    expect(groups[0].games).toHaveLength(1);
    expect(groups[0].games[0].gameName).toBe('red-blue');
    expect(groups[0].games[0].sprites).toEqual([
      { url: 'rb_front', label: 'Front Default' },
      { url: 'rb_back', label: 'Back Default' },
    ]);

    expect(groups[1].games[0].gameName).toBe('scarlet-violet');
    expect(groups[1].games[0].sprites).toEqual([{ url: 'sv_front', label: 'Front Default' }]);
  });

  it('should render generation cards', () => {
    const titles = Array.from(
      fixture.nativeElement.querySelectorAll('.generation-title') as NodeListOf<HTMLElement>,
    ).map((el) => el.textContent);

    expect(titles).toEqual(['Generation I', 'Generation IX']);
  });
});
