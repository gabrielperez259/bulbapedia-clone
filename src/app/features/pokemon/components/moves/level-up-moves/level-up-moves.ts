import { Component, effect, inject, input } from '@angular/core';
import { MovesDataClient } from '../../../services/moves-data-client';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";
import { Types } from "../../types/types";
import { FormatStatPipe } from "../../../../../shared/pipes/format-stat.pipe";

@Component({
  selector: '[app-level-up-moves]',
  imports: [CleanTextPipe, FormatStatPipe],
  templateUrl: './level-up-moves.html',
  styleUrl: './level-up-moves.scss',
  providers: [MovesDataClient]
})
export class LevelUpMoves {

  moveName = input.required<string>()  
  learnedAtLevel = input.required<number>()
  movesDataClient = inject(MovesDataClient);
  
  moveNameEffect = effect(() => {    
    this.movesDataClient.search.set(this.moveName());
  
  })  

}
