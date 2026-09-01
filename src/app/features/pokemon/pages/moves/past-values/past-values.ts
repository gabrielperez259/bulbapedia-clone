import { Component, inject, input } from '@angular/core';
import { MoveDetails, PastMoveValues } from '../../../models/moves/move-details';
import { MovesDataClient } from '../../../services/moves-data-client';

@Component({
  selector: 'app-past-values',
  imports: [],
  templateUrl: './past-values.html',
  styleUrl: './past-values.scss',
})
export class PastValues {
  
  pastValues = input.required<MoveDetails['past_values']>();
  movesDataDetails = inject(MovesDataClient)


}
