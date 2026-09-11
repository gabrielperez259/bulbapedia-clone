import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import { PokemonAbilities } from './pokemon-abilities';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { By } from '@angular/platform-browser';
import { AbilityDescription } from '../../../components/ability-description/ability-description';

describe('PokemonAbilities', () => {
  let fixture: ComponentFixture<PokemonAbilities>;
  let component: PokemonAbilities;

  let pokemonDataClientMock: {
    pokemonDetailsLoading: ReturnType<typeof signal<boolean>>;
    pokemonDetailsError: ReturnType<typeof signal<boolean>>;
    pokemonAbilities: ReturnType<typeof signal<any[]>>;
    pokemonPastAbilities: ReturnType<typeof signal<any[]>>;
  };

  beforeEach(async () => {
    pokemonDataClientMock = {
      pokemonDetailsLoading: signal(false),
      pokemonDetailsError: signal(false),
      pokemonAbilities: signal([]),
      pokemonPastAbilities: signal([]),
    };

    await TestBed.configureTestingModule({
      imports: [PokemonAbilities],
      providers: [
        provideRouter([]),
        {
          provide: PokemonDetailsDataClient,
          useValue: pokemonDataClientMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonAbilities);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon abilities', async () => {
    pokemonDataClientMock.pokemonAbilities.set([
      {
        ability: {
          name: 'overgrow',
        },
        is_hidden: false,
      },
      {
        ability: {
          name: 'chlorophyll',
        },
        is_hidden: true,
      },
    ]);

    await fixture.whenStable();

    const abilities = fixture.nativeElement.querySelectorAll('.ability');

    expect(abilities.length).toBe(2);
    expect(abilities[0].textContent).toContain('Ability:');
    expect(abilities[0].textContent).toContain('Overgrow');

    expect(abilities[1].textContent).toContain('Hidden Ability:');
    expect(abilities[1].textContent).toContain('Chlorophyll');
  });

  it('should mark hidden abilities with the hidden class', async () => {
    pokemonDataClientMock.pokemonAbilities.set([
      {
        ability: {
          name: 'overgrow',
        },
        is_hidden: false,
      },
      {
        ability: {
          name: 'chlorophyll',
        },
        is_hidden: true,
      },
    ]);

    await fixture.whenStable();

    const abilities = fixture.nativeElement.querySelectorAll('.ability');

    expect(abilities[0].classList.contains('hidden')).toBe(false);
    expect(abilities[1].classList.contains('hidden')).toBe(true);
  });

  it('should create the correct ability router links', async () => {
    pokemonDataClientMock.pokemonAbilities.set([
      {
        ability: {
          name: 'overgrow',
        },
        is_hidden: false,
      },
    ]);

    await fixture.whenStable();

    const link = fixture.nativeElement.querySelector('.ability a');

    expect(link.getAttribute('href')).toBe('/ability/overgrow');
  });

  it('should display past abilities', async () => {
    pokemonDataClientMock.pokemonPastAbilities.set([
      {
        generation: {
          name: 'generation-iii',
        },
        abilities: [
          {
            ability: {
              name: 'overgrow',
            },
          },
        ],
      },
    ]);

    await fixture.whenStable();

    const pastAbility = fixture.nativeElement.querySelector('.past-ability');

    expect(pastAbility).not.toBeNull();
    expect(pastAbility.textContent).toContain('Past Abilities Changed in Generation');    
    expect(pastAbility.textContent).toContain('Overgrow');
  });

  it('should create the correct router links for past abilities', async () => {
    pokemonDataClientMock.pokemonPastAbilities.set([
      {
        generation: {
          name: 'generation-iii',
        },
        abilities: [
          {
            ability: {
              name: 'overgrow',
            },
          },
        ],
      },
    ]);

    await fixture.whenStable();

    const link = fixture.nativeElement.querySelector('.past-ability a');

    expect(link.getAttribute('href')).toBe('/ability/overgrow');
  });

  it('should render ability descriptions with the ability name', async () => {
    pokemonDataClientMock.pokemonAbilities.set([
      {
        ability: {
          name: 'overgrow',
        },
        is_hidden: false,
      },
    ]);

    await fixture.detectChanges();

  const abilityDescription = fixture.debugElement.query(
    By.directive(AbilityDescription),
  );

  expect(abilityDescription).not.toBeNull();
  expect(
    abilityDescription.componentInstance.abilityName(),
  ).toBe('overgrow');
  });
});
