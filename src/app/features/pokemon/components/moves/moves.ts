import { Component, computed, inject, input, output, signal } from '@angular/core';
import { PokemonDetailsDataClient } from '../../services/pokemon-details.data-client';
import { Move } from '../../models/moves/move';
import { Grid } from "../../../../shared/components/grid/grid";
import { MatButtonToggleGroup, MatButtonToggle } from "@angular/material/button-toggle";
import { ALL_VERSION_GROUPS, POKEMON_VERSION_GROUPS } from '../../../../shared/constants/version-group';
import { FormsModule } from '@angular/forms';
import { MoveDetails } from "./move-details/move-details";

@Component({
  selector: 'app-moves',
  imports: [Grid, MatButtonToggleGroup, MatButtonToggle, FormsModule, MoveDetails],
  templateUrl: './moves.html',
  styleUrl: './moves.scss'
})
export class Moves {

  moves = inject(PokemonDetailsDataClient).pokemonDetails()!.moves;


  public learnMethod = signal<string>('level-up');
  public version = signal<string>(POKEMON_VERSION_GROUPS.RED_BLUE);
  public versions = signal(ALL_VERSION_GROUPS); 

  public setLearnMethodValue(value: string) {
    this.learnMethod.set(value);
  }

  public setGenMoveValue(value: string) {
    this.version.set(value);
  }
  computedMoveList = computed<Move[]>(() => {
    return this.moves.filter(move =>
      move.version_group_details.some(detail =>        
        detail.move_learn_method.name.includes(this.learnMethod()) &&
        detail.version_group.name.includes(this.version())
      )
    );
  });


}








