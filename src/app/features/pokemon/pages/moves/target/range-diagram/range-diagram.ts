import { Component, computed, input } from '@angular/core';
import { BattleScenario, UserPosition } from '../models/battle-scenarios';
export type RangeDiagramType =
  | 'specific-move'
  | 'selected-pokemon'
  | 'user'
  | 'random-opponent'
  | 'all-other-pokemon'
  | 'all-opponents'
  | 'entire-field'
  | 'user-or-ally'
  | 'ally'
  | 'all-allies'
  | 'all-pokemon'
  | 'opponents-field'
  | 'users-field'
  | 'user-and-allies';

export type RangeSlotState = 'empty' | 'user' | 'target' | 'user-target';

export interface RangeSlot {
  position:
    | 'opponent-left'
    | 'opponent-center'
    | 'opponent-right'
    | 'user-left'
    | 'user-center'
    | 'user-right';
  state: RangeSlotState;
}

@Component({
  selector: 'app-range-diagram',
  imports: [],
  templateUrl: './range-diagram.html',
  styleUrl: './range-diagram.scss',
})
export class RangeDiagramComponent {
  readonly battleScenarios: BattleScenario[] = [
    {
      format: 'double',
      userPosition: 'left',
    },
    {
      format: 'double',
      userPosition: 'right',
    },
    {
      format: 'triple',
      userPosition: 'left',
    },
    {
      format: 'triple',
      userPosition: 'center',
    },
    {
      format: 'triple',
      userPosition: 'right',
    },
  ];
  public type = input.required<RangeDiagramType>();

  private createSlots(scenario: BattleScenario, type: RangeDiagramType): RangeSlot[] {
    const positions: UserPosition[] =
      scenario.format === 'double' ? ['left', 'right'] : ['left', 'center', 'right'];

    return [
      ...positions.map((position) => ({
        position: `opponent-${position}` as RangeSlot['position'],
        state: this.getSlotState('opponent', position, scenario, type),
      })),

      ...positions.map((position) => ({
        position: `user-${position}` as RangeSlot['position'],
        state: this.getSlotState('user', position, scenario, type),
      })),
    ];
  }
  private getSlotState(
    side: 'user' | 'opponent',
    position: UserPosition,
    scenario: BattleScenario,
    type: RangeDiagramType,
  ): RangeSlotState {
    const isUser = side === 'user' && position === scenario.userPosition;

    const isAlly = side === 'user' && position !== scenario.userPosition;

    const isOpponent = side === 'opponent';

    switch (type) {
      case 'specific-move':
        return isUser ? 'user' : 'empty';

      case 'user':
        return isUser ? 'user-target' : 'empty';

      case 'random-opponent':
      case 'all-opponents':
      case 'opponents-field':
        return isUser ? 'user' : isOpponent ? 'target' : 'empty';

      case 'selected-pokemon':
      case 'all-other-pokemon':
        if (isUser) {
          return 'user';
        }

        return this.isTargetedByAllOtherPokemon(side, position, scenario) ? 'target' : 'empty';

      case 'user-and-allies':
        return isUser ? 'user-target' : isAlly ? 'target' : 'empty';
      case 'user-or-ally':
        if (isUser) {
          return 'user-target';
        }

        return this.isAdjacentAlly(side, position, scenario) ? 'target' : 'empty';

      case 'ally':
        return isUser ? 'user' : this.isAdjacentAlly(side, position, scenario) ? 'target' : 'empty';

      case 'all-allies':
        return isUser ? 'user' : isAlly ? 'target' : 'empty';

      case 'entire-field':
      case 'all-pokemon':
        return isUser ? 'user-target' : 'target';

      case 'users-field':
        return isUser ? 'user-target' : isAlly ? 'target' : 'empty';

      default:
        return isUser ? 'user' : 'empty';
    }
  }
  readonly scenarios = computed(() =>
    this.battleScenarios.map((scenario) => ({
      scenario,
      slots: this.createSlots(scenario, this.type()),
    })),
  );
  private isAdjacentAlly(
    side: 'user' | 'opponent',
    position: UserPosition,
    scenario: BattleScenario,
  ): boolean {
    if (side !== 'user') {
      return false;
    }

    if (position === scenario.userPosition) {
      return false;
    }

    if (scenario.format === 'double') {
      return true;
    }

    const adjacentPositions: Record<UserPosition, UserPosition[]> = {
      left: ['center'],
      center: ['left', 'right'],
      right: ['center'],
    };

    return adjacentPositions[scenario.userPosition].includes(position);
  }
  private isTargetedByAllOtherPokemon(
    side: 'user' | 'opponent',
    position: UserPosition,
    scenario: BattleScenario,
  ): boolean {
    // Pokémon diretamente em frente ao usuário.
    if (side === 'opponent' && position === scenario.userPosition) {
      return true;
    }

    // Em Double Battle, todos os outros Pokémon são adjacentes.
    if (scenario.format === 'double') {
      return true;
    }

    // Em Triple Battle, somente posições adjacentes
    // à posição do usuário são atingidas.
    const adjacentPositions: Record<UserPosition, UserPosition[]> = {
      left: ['center'],
      center: ['left', 'right'],
      right: ['center'],
    };

    return adjacentPositions[scenario.userPosition].includes(position);
  }
}
