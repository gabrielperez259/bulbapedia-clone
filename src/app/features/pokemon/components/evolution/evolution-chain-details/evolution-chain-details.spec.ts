import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvolutionChainDetails } from './evolution-chain-details';
import { createMockEvolutionDetail } from '../../../../../../testing/factories/evolution-factory';
import { EvolutionDetail } from '../../../models/evolution/evolution';
import { inputBinding, signal } from '@angular/core';

describe('EvolutionChainDetails', () => {
  let component: EvolutionChainDetails;
  let fixture: ComponentFixture<EvolutionChainDetails>;
  
  let mockEvolutionDetail = signal<EvolutionDetail>(createMockEvolutionDetail());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionChainDetails],
    }).compileComponents();
    fixture = TestBed.createComponent(EvolutionChainDetails, {
      bindings: [inputBinding('details', mockEvolutionDetail)],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the trigger when it is a supported trigger', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      trigger: {
        name: 'trade',
        url: 'https://pokeapi.co/api/v2/evolution-trigger/2/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Trade');
  });

  it('should not render the trigger when it is not supported', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      trigger: {
        name: 'level-up',
        url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Level Up');
  });

  it('should render Female when gender is 1', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      gender: 1,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Female');
  });

  it('should render Male when gender is different from 1', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      gender: 2,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Male');
  });

  it('should not render gender when gender is null', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      gender: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Female');
    expect(fixture.nativeElement.textContent).not.toContain('Male');
  });

  it('should render the held item when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      held_item: {
        name: 'metal-coat',
        url: 'https://pokeapi.co/api/v2/item/210/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('holding metal-coat');
  });
  it('should not render the held item when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      held_item: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('holding');
  });
  it('should render the item when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      item: {
        name: 'thunder-stone',
        url: 'https://pokeapi.co/api/v2/item/83/',
      },
    });
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Thunder Stone');
  });

  it('should not render the item when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      item: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Thunder Stone');
  });

  it('should render the known move when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      known_move: {
        name: 'iron-defense',
        url: 'https://pokeapi.co/api/v2/move/334/',
      },
    });
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Level up while knowing');

    expect(fixture.nativeElement.textContent).toContain('Iron Defense');
  });
  it('should not render the known move when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      known_move: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Level up while knowing');
  });
  it('should render the known move type when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      known_move_type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Level up with knowing move type fire');
  });

  it('should not render the known move type when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      known_move_type: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Level up with knowing move type');
  });
  it('should render the location when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      location: {
        name: 'mt-coronet',
        url: 'https://pokeapi.co/api/v2/location/10/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('At Mt Coronet');
  });

  it('should not render the location when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      location: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('At');
  });

  it('should render the minimum level when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_level: 16,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Level 16');
  });

  it('should not render the minimum level when it is null', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_level: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Level');
  });
  it('should render the minimum affection when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_affection: 2,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('with min affection: 2');
  });

  it('should not render the minimum affection when it is null', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_affection: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('with min affection:');
  });

  it('should render the minimum beauty when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_beauty: 3,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Minimum Beauty: 3');
  });

  it('should not render the minimum beauty when it is null', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_beauty: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Minimum Beauty:');
  });

  it('should render the minimum damage taken when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_damage_taken: 50,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Min damage taken: 50');
  });

  it('should not render the minimum damage taken when it is null', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_damage_taken: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Min damage taken:');
  });

  it('should render the minimum happiness when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_happiness: 100,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('with min happiness: 100');
  });

  it('should not render the minimum happiness when it is null', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      min_happiness: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('with min happiness:');
  });
  it('should render the rain requirement when needed', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      needs_overworld_rain: true,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Needs Rain or Fog');
  });

  it('should not render the rain requirement when it is not needed', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      needs_overworld_rain: false,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Needs Rain or Fog');
  });

  it('should render the party Pokémon when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      party_species: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Party Pokémon: Bulbasaur');
  });

  it('should not render the party Pokémon when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      party_species: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Party Pokémon:');
  });

  it('should render the party type when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      party_type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Party Type: Fire');
  });

  it('should not render the party type when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      party_type: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Party Type:');
  });

  it('should render Attack > Defense when relative physical stats is 1', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      relative_physical_stats: 1,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Attack > Defense');
  });

  it('should render Defense > Attack when relative physical stats is -1', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      relative_physical_stats: -1,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Defense > Attack');
  });

  it('should render Attack = Defense when relative physical stats is 0', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      relative_physical_stats: 0,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Attack = Defense');
  });

  it('should not render relative physical stats when it is null', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      relative_physical_stats: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Attack > Defense');
    expect(fixture.nativeElement.textContent).not.toContain('Defense > Attack');
    expect(fixture.nativeElement.textContent).not.toContain('Attack = Defense');
  });

  it('should render the region when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      region: {
        name: 'galar',
        url: 'https://pokeapi.co/api/v2/region/8/',
      },
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('in Galar');
  });

  it('should not render the region when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      region: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('in Galar');
  });

  it('should render the time of day when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      time_of_day: 'day',
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Time of Day: Day');
  });

  it('should not render the time of day when it is empty', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      time_of_day: '',
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Time of Day:');
  });

  it('should render the turn device upside down requirement when needed', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      turn_upside_down: true,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Turn Device Upside Down');
  });

  it('should not render the turn device upside down requirement when it is not needed', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      turn_upside_down: false,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Turn Device Upside Down');
  });

  it('should render the used move when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      used_move: {
        name: 'ancient-power',
        url: 'https://pokeapi.co/api/v2/move/246/',
      },
      min_move_count: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Level up after');
    expect(fixture.nativeElement.textContent).toContain('using ancient-power');
  });

  it('should not render the used move when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      used_move: null,
      min_move_count: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Level up after');
  });

  it('should render the minimum move count when it exists', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      used_move: {
        name: 'rollout',
        url: 'https://pokeapi.co/api/v2/move/205/',
      },
      min_move_count: 3,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('3 times');
  });

  it('should not render the minimum move count when it does not exist', async () => {
    mockEvolutionDetail.set({
      ...createMockEvolutionDetail(),
      used_move: {
        name: 'rollout',
        url: 'https://pokeapi.co/api/v2/move/205/',
      },
      min_move_count: null,
    });

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('times');
  });
});
