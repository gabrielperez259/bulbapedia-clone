import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, signal } from '@angular/core';

import { PokemonMoveDetails } from './pokemon-move-details';
import { MovesDataClient } from '../../../../../services/moves-data-client';
import { MoveDetails } from '../../../../../models/moves/move-details';

describe('PokemonMoveDetails', () => {
  let component: PokemonMoveDetails;
  let fixture: ComponentFixture<PokemonMoveDetails>;

  const moveName = signal('historic-move');
  const learnedAtLevel = signal(10);
  const learnMethod = signal('level-up');
  const versionGroup = signal('red-blue');
  const moveDetails = signal<MoveDetails | undefined>({
    name: 'historic-move',
    power: 120,
    accuracy: 90,
    pp: 5,
    effect_chance: 30,
    effect_entries: [],
    type: { name: 'fire', url: '/type/10' },
    damage_class: { name: 'special', url: '/move-damage-class/3' },
    past_values: [
      {
        version_group: { name: 'x-y', url: '/version-group/12' },
        power: 100,
        accuracy: 95,
        pp: 10,
        effect_chance: 20,
        effect_entries: [],
        type: { name: 'normal', url: '/type/1' },
      },
    ],
  });

  const movesDataClientMock = {
    search: signal(''),
    moveDetails: { value: moveDetails },
    moveName: moveName,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PokemonMoveDetails] })
      .overrideComponent(PokemonMoveDetails, {
        set: {
          providers: [{ provide: MovesDataClient, useValue: movesDataClientMock }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonMoveDetails, {
      bindings: [
        inputBinding('moveName', moveName),
        inputBinding('learnedAtLevel', learnedAtLevel),
        inputBinding('learnMethod', learnMethod),
        inputBinding('versionGroup', versionGroup),
      ],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the historical values for the selected version group', () => {
    const cells = fixture.nativeElement.querySelectorAll('td');

    expect(cells[2].textContent).toContain('Normal');
    expect(cells[4].textContent).toContain('100');
    expect(cells[5].textContent).toContain('95%');
    expect(cells[6].textContent).toContain('10');
  });

  it('renders current values after selecting a version group without past values', async () => {
    versionGroup.set('scarlet-violet');

    await fixture.whenStable();

    const cells = fixture.nativeElement.querySelectorAll('td');
    expect(cells[2].textContent).toContain('Fire');
    expect(cells[4].textContent).toContain('120');
    expect(cells[5].textContent).toContain('90%');
    expect(cells[6].textContent).toContain('5');
  });
});
