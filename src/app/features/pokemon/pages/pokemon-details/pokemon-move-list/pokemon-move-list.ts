import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import {
  ALL_VERSION_GROUPS,
  POKEMON_VERSION_GROUPS,
} from '../../../../../shared/constants/version-group';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PokemonMoveDetails } from './pokemon-move-details/pokemon-move-details';
import { SortService } from '../../../../../shared/services/sort-service';
import { SelectionBar } from '../../../components/selection-bar/selection-bar';
import { LEARN_METHODS } from '../../../../../shared/constants/learn.method';
import { Move } from '../../../models/moves/move';

export interface PokemonMoveListItem {
  move: Move['move'];
  level: number;
  method: string;
}

export function getMovesForVersionAndLearnMethod(
  moves: Move[],
  versionGroup: string,
  learnMethod: string,
): PokemonMoveListItem[] {
  return moves
    .map((moveItem) => {
      const matchingDetail = moveItem.version_group_details.find(
        (detail) =>
          detail.version_group.name === versionGroup &&
          detail.move_learn_method.name === learnMethod,
      );

      if (!matchingDetail) return null;

      return {
        move: moveItem.move,
        level: matchingDetail.level_learned_at,
        method: matchingDetail.move_learn_method.name,
      };
    })
    .filter((item): item is PokemonMoveListItem => item !== null)
    .sort((a, b) => a.level - b.level);
}

@Component({
  selector: 'app-pokemon-move-list',
  imports: [FormsModule, MatTableModule, PokemonMoveDetails, SelectionBar],
  templateUrl: './pokemon-move-list.html',
  styleUrl: './pokemon-move-list.scss',
})
export class PokemonMoveList {
  moves = inject(PokemonDetailsDataClient).pokemonDetails()!.moves;
  sortService = inject(SortService);

  public learnMethod = signal<string>('level-up');
  public learnMethods = signal(LEARN_METHODS);
  public version = signal<string>(POKEMON_VERSION_GROUPS.SCARLET_VIOLET);
  public initialLearnMethod = signal<string>('level-up');
  public initialVersion = signal<string>(POKEMON_VERSION_GROUPS.SCARLET_VIOLET);
  public versions = signal(ALL_VERSION_GROUPS);

  public setLearnMethodValue(value: string) {
    this.learnMethod.set(value);
  }

  public setGenMoveValue(value: string) {
    this.version.set(value);
  }

  computedMoveList = computed(() => {
    return getMovesForVersionAndLearnMethod(this.moves, this.version(), this.learnMethod());
  });
}
