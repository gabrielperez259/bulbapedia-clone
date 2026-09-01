import { Component, computed, effect, inject, input } from '@angular/core';
import { MovesDataClient } from '../../../../services/moves-data-client';
import { CleanTextPipe } from '../../../../../../shared/pipes/clean-text.pipe';
import { FormatStatPipe } from '../../../../../../shared/pipes/format-stat.pipe';
import { ColorTypePipe } from '../../../../../../shared/pipes/color-type.pipe';
import { resolveMoveDetailsForVersionGroup } from '../../../../models/moves/move-details';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-pokemon-move-details]',
  imports: [CleanTextPipe, FormatStatPipe, ColorTypePipe, RouterLink],
  templateUrl: './pokemon-move-details.html',
  styleUrl: './pokemon-move-details.scss',
  providers: [MovesDataClient],
})
export class PokemonMoveDetails {
  moveName = input.required<string>();
  learnedAtLevel = input.required<number>();
  learnMethod = input.required<string>();
  versionGroup = input.required<string>();

  movesDataClient = inject(MovesDataClient);

  moveDetails = computed(() =>
    resolveMoveDetailsForVersionGroup(
      this.movesDataClient.moveDetails.value(),
      this.versionGroup(),
    ),
  );

  moveNameEffect = effect(() => {
    this.movesDataClient.search.set(this.moveName());
  });
}
