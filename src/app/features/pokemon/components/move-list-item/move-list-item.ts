import { Component, computed, effect, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovesDataClient } from '../../services/moves-data-client';
import { CleanTextPipe } from '../../../../shared/pipes/clean-text.pipe';
import { FormatStatPipe } from '../../../../shared/pipes/format-stat.pipe';
import { ColorTypePipe } from '../../../../shared/pipes/color-type.pipe';
import { resolveMoveDetailsForVersionGroup } from '../../models/moves/move-details';

@Component({
  selector: '[app-move-list-item]',
  imports: [CleanTextPipe, FormatStatPipe, ColorTypePipe, RouterLink],
  templateUrl: './move-list-item.html',
  styleUrl: './move-list-item.scss',
  providers: [MovesDataClient],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveListItem {
  moveName = input.required<string>();
  learnedAtLevel = input<number | string | null>(null);
  versionGroup = input<string | undefined>(undefined);
  showLevel = input<boolean>(true);

  readonly movesDataClient = inject(MovesDataClient);
  readonly rootMovesDataClient = inject(MovesDataClient, { skipSelf: true, optional: true });

  readonly moveDetails = computed(() => {
    const rawDetails = this.movesDataClient.moveDetails.value();
    const version = this.versionGroup();
    if (version) {
      return resolveMoveDetailsForVersionGroup(rawDetails, version);
    }
    return rawDetails;
  });

  constructor() {
    effect(() => {
      const name = this.moveName();
      if (name) {
        this.movesDataClient.search.set(name);
      }
    });

    effect(() => {
      const details = this.moveDetails();
      if (details && details.name) {
        this.rootMovesDataClient?.setCachedDetail(details.name, details);
      }
    });
  }
}
