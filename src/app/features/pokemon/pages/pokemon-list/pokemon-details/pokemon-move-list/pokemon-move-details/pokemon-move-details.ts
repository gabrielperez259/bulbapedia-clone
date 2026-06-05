import { Component, effect, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { MovesDataClient } from '../../../../../services/moves-data-client';
import { CleanTextPipe } from "../../../../../../../shared/pipes/clean-text.pipe";
import { FormatStatPipe } from "../../../../../../../shared/pipes/format-stat.pipe";
import { ColorTypePipe } from "../../../../../../../shared/pipes/color-type.pipe";


@Component({
  selector: '[app-pokemon-move-details]',
  imports: [CleanTextPipe, FormatStatPipe, ColorTypePipe],
  templateUrl: './pokemon-move-details.html',
  styleUrl: './pokemon-move-details.scss',
  providers: [MovesDataClient]
})
export class PokemonMoveDetails {

  moveName = input.required<string>()  
  learnedAtLevel = input.required<number>()
  learnMethod = input.required<string>()

  movesDataClient = inject(MovesDataClient);
   
  
  moveNameEffect = effect(() => {    
    this.movesDataClient.search.set(this.moveName());
  
  })  

}
