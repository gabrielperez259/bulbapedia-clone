import { describe, expect, it } from 'vitest';
import { MoveDetails, resolveMoveDetailsForVersionGroup } from './move-details';

const move: MoveDetails = {
  name: 'historic-move',
  power: 120,
  accuracy: 90,
  pp: 5,
  priority: 0,
  effect_chance: 30,
  effect_entries: [],
  generation: { name: 'generation-i', url: '/generation/1' },
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
  contest_combos: {
    normal: {
      use_before: [],
      use_after: [],
    },
    super: {
      use_before: [],
      use_after: [],
    } 
  } ,
   contest_type: {
    id: 1,
    name: 'cool',  
    berry_flavor: { name: 'cool', url: '/berry-flavor/1' },
    names: [{ name: 'cool', language: { name: 'en', url: '/language/1' }, color: 'blue' }]
   },
   contest_effect: {
    id: 1,
    appeal: 1,
    jam: 1,
    effect_entries: [],
    flavor_text_entries: []
   },

   target: { name: 'user', url: '/move-target/1' }
};

describe('resolveMoveDetailsForVersionGroup', () => {
  it('uses historical values for an earlier version group in the same range', () => {
    expect(resolveMoveDetailsForVersionGroup(move, 'red-blue')).toMatchObject({
      power: 100,
      accuracy: 95,
      pp: 10,
      effect_chance: 20,
      type: { name: 'normal' },
    });
  });

  it('keeps current values when no historical values apply', () => {
    expect(resolveMoveDetailsForVersionGroup(move, 'scarlet-violet')).toBe(move);
  });

  it('returns different values for the same move in different version groups', () => {
    expect(resolveMoveDetailsForVersionGroup(move, 'red-blue')?.power).toBe(100);
    expect(resolveMoveDetailsForVersionGroup(move, 'scarlet-violet')?.power).toBe(120);
  });

  it('does not replace a current value with a null unchanged historical field', () => {
    const moveWithUnchangedPower: MoveDetails = {
      ...move,
      past_values: [{ ...move.past_values[0], power: null }],
    };

    expect(resolveMoveDetailsForVersionGroup(moveWithUnchangedPower, 'red-blue')?.power).toBe(120);
  });

  it('uses the closest historical range when a move has multiple changes', () => {
    const moveWithMultipleRanges: MoveDetails = {
      ...move,
      past_values: [
        {
          ...move.past_values[0],
          version_group: { name: 'black-white', url: '/version-group/10' },
          power: 35,
        },
        {
          ...move.past_values[0],
          version_group: { name: 'sun-moon', url: '/version-group/15' },
          power: 50,
        },
      ],
    };

    expect(resolveMoveDetailsForVersionGroup(moveWithMultipleRanges, 'red-blue')?.power).toBe(35);
    expect(resolveMoveDetailsForVersionGroup(moveWithMultipleRanges, 'x-y')?.power).toBe(50);
    expect(resolveMoveDetailsForVersionGroup(moveWithMultipleRanges, 'scarlet-violet')?.power).toBe(
      120,
    );
  });
});
