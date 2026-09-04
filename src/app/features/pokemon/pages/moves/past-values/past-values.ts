import { Component, inject, input } from '@angular/core';
import { MoveDetails } from '../../../models/moves/move-details';
import { MovesDataClient } from '../../../services/moves-data-client';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";
import { MoveListItem } from '../../../components/move-list-item/move-list-item';

@Component({
  selector: 'app-past-values',
  imports: [CleanTextPipe],
  templateUrl: './past-values.html',
  styleUrl: './past-values.scss',
})
export class PastValues {  
  movesDataDetails = inject(MovesDataClient)

}
