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
  | 'user-and-allies'
  | 'fainting-pokemon'
  | 'selected-pokemon-first';

export type RangeSlotState = 'empty' | 'user' | 'target' | 'possible-target' | 'user-target';

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

    const isAdjacentAlly = this.isAdjacentAlly(side, position, scenario);

    const isAdjacentOpponent = this.isAdjacentPokemon(side, position, scenario);

    const isAdjacentPokemon = isAdjacentAlly || isAdjacentOpponent;

    switch (type) {
      case 'specific-move':
        return isAdjacentOpponent ? 'possible-target' : 'empty';

      case 'selected-pokemon':      
        return isAdjacentPokemon ? 'possible-target' : isUser ? 'user' : 'empty';

      case 'selected-pokemon-first':  
        return isOpponent && isAdjacentOpponent ? 'possible-target' : isUser ? 'user' : 'empty';
        
      case 'all-opponents':
        return isOpponent && isAdjacentOpponent ? 'target' : isUser ? 'user' : 'empty';

      case 'opponents-field':
        return isOpponent ? 'target' : isUser ? 'user' : 'empty';

      case 'all-other-pokemon':
        return isAdjacentPokemon ? 'target' : isUser ? 'user' : 'empty';

      case 'entire-field':
      case 'all-pokemon':
        return isUser ? 'user-target' : 'target';

      case 'user':
      case 'random-opponent':
      case 'fainting-pokemon':
        return isUser ? 'user-target' : 'empty';

      case 'ally':
        return isAdjacentAlly ? 'target' : isUser ? 'user' : 'empty';

      case 'users-field':
        return isUser ? 'user-target' : isAlly ? 'target' : 'empty';

      case 'user-or-ally':
        return isUser || isAdjacentAlly ? 'possible-target' : 'empty';

      case 'all-allies':
        return isUser ? 'user' : isAlly ? 'target' : 'empty';

      case 'user-and-allies':
        return isUser ? 'user-target' : isAlly ? 'target' : 'empty';

      default:
        return 'empty';
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
    if (side !== 'user' || position === scenario.userPosition) {
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
  private isAdjacentPokemon(
    side: 'user' | 'opponent',
    position: UserPosition,
    scenario: BattleScenario,
  ): boolean {
    if (position === scenario.userPosition) {
      return side === 'opponent';
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
}
