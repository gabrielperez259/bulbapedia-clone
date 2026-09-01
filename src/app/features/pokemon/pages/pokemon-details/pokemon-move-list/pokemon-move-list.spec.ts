import { describe, expect, it } from 'vitest';
import { Move } from '../../../models/moves/move';
import { getMovesForVersionAndLearnMethod } from './pokemon-move-list';

describe('getMovesForVersionAndLearnMethod', () => {
  const moves: Move[] = [
    {
      move: { name: 'historic-move', url: '/move/1' },
      version_group_details: [
        {
          level_learned_at: 10,
          move_learn_method: { name: 'level-up', url: '/method/1' },
          version_group: { name: 'red-blue', url: '/version-group/1' },
        },
      ],
    },
    {
      move: { name: 'modern-move', url: '/move/2' },
      version_group_details: [
        {
          level_learned_at: 20,
          move_learn_method: { name: 'level-up', url: '/method/1' },
          version_group: { name: 'scarlet-violet', url: '/version-group/2' },
        },
      ],
    },
  ];

  it('keeps the move list scoped to the selected version group', () => {
    expect(getMovesForVersionAndLearnMethod(moves, 'red-blue', 'level-up')).toEqual([
      { move: moves[0].move, level: 10, method: 'level-up' },
    ]);
    expect(getMovesForVersionAndLearnMethod(moves, 'scarlet-violet', 'level-up')).toEqual([
      { move: moves[1].move, level: 20, method: 'level-up' },
    ]);
  });
});
