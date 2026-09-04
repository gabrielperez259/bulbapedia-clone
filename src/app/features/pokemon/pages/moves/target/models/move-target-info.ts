import { RangeDiagramType } from '../range-diagram/range-diagram';

export interface MoveTargetInfo {
  label: string;
  description: string;
  diagram: RangeDiagramType;
}

export const MOVE_TARGETS: Record<string, MoveTargetInfo> = {
  'specific-move': {
    label: 'Specific Move',
    description: 'Targets a specific move. The move determines how the target is selected.',
    diagram: 'user',
  },
  'selected-pokemon-me-first': {
    label: 'Selected Pokémon First',
    description:
      'One other Pokémon on the field, selected by the trainer.  Stolen moves reuse the same target.',
    diagram: 'selected-pokemon-first',
  },

  'selected-pokemon': {
    label: 'Selected Pokémon',
    description: 'Targets one adjacent Pokémon chosen by the user.',
    diagram: 'selected-pokemon',
  },

  user: {
    label: 'User',
    description: 'Targets the Pokémon using this move.',
    diagram: 'user',
  },

  'random-opponent': {
    label: 'Random Opponent',
    description: 'Targets one opposing Pokémon chosen at random.',
    diagram: 'random-opponent',
  },

  'all-other-pokemon': {
    label: 'All Other Pokémon',
    description:
      'Targets every other adjacent Pokémon on the battlefield except the Pokémon using this move.',
    diagram: 'all-other-pokemon',
  },

  'all-opponents': {
    label: 'All Opposing Pokémon',
    description: 'Targets every adjacent opposing Pokémon currently on the battlefield.',
    diagram: 'all-opponents',
  },

  'entire-field': {
    label: 'Entire Field',
    description:
      'Affects the entire battlefield, including both the user’s and the opponent’s side.',
    diagram: 'entire-field',
  },

  'user-or-ally': {
    label: 'User or Ally',
    description: 'Targets either the Pokémon using this move or one of its adjacent allies.',
    diagram: 'user-or-ally',
  },

  ally: {
    label: 'Ally',
    description: 'Targets one adjacent allied Pokémon chosen by the user.',
    diagram: 'ally',
  },

  'all-allies': {
    label: 'All Allies',
    description: 'Targets all allied Pokémon currently on the battlefield.',
    diagram: 'all-allies',
  },
  'user-and-allies': {
    label: 'User and Allies',
    description: 'Targets the user and their allies.',
    diagram: 'user-and-allies',
  },

  'all-pokemon': {
    label: 'All Pokémon',
    description: 'Targets every Pokémon currently on the battlefield.',
    diagram: 'all-pokemon',
  },

  'opponents-field': {
    label: 'Opposing Side',
    description:
      'Affects the opposing side of the battlefield rather than targeting a specific Pokémon.',
    diagram: 'opponents-field',
  },

  'users-field': {
    label: 'User’s Side',
    description:
      'Affects the user’s side of the battlefield rather than targeting a specific Pokémon.',
    diagram: 'users-field',
  },
  'fainting-pokemon': {
    label: 'Fainting Pokemon',
    description:
      'The user targets a fainting pokemon.',
    diagram: 'fainting-pokemon',
  }
};
