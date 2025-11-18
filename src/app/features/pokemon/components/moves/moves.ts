import { Component, computed, inject, signal } from '@angular/core';
import { PokemonDetailsDataClient } from '../../services/pokemon-details.data-client';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { Move } from '../../models/moves/move';
import { Grid } from "../../../../shared/components/grid/grid";

@Component({
  selector: 'app-moves',
  imports: [CapitalizeWordsPipe, Grid],
  templateUrl: './moves.html',
  styleUrl: './moves.scss'
})
export class Moves {

  moves = inject(PokemonDetailsDataClient).pokemonDetails()!.moves;
  genOneMoveSetSignal = signal<Move[]>([]);
  genOneMoves: string[] = []


  levelUpMoveSet = computed<Move[]>(() => {
    return this.moves.filter(move =>
      move.version_group_details.some(detail =>
        detail.version_group.name.includes('scarlet') &&
        detail.move_learn_method.name.includes('level-up')
      )
    );
  });

    machineMoveSet = computed<Move[]>(() => {
    return this.moves.filter(move =>
      move.version_group_details.some(detail =>
        detail.version_group.name.includes('scarlet') &&
        detail.move_learn_method.name.includes('machine')
      )
    );
  });

   breedingMoveSet = computed<Move[]>(() => {
    return this.moves.filter(move =>
      move.version_group_details.some(detail =>
        detail.version_group.name.includes('scarlet') &&
        detail.move_learn_method.name.includes('egg')
      )
    );
  });
}








