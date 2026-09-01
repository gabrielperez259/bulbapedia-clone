import { Component, effect, inject, input } from '@angular/core';
import { MovesDataClient } from '../../../services/moves-data-client';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-move-description',
  imports: [CleanTextPipe],
  templateUrl: './move-description.html',
  styleUrl: './move-description.scss',
})
export class MoveDescription {  

  movesDataDetails = inject(MovesDataClient);
  

}
