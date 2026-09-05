import { Component, computed, effect, inject, signal } from '@angular/core';
import { ContestTypeDataClient } from '../../../services/contest-type-data-client';
import { MovesDataClient } from '../../../services/moves-data-client';
import { ContestCombo } from '../../../models/contest/contest.interface';
import { ContestEffectDataClient } from '../../../services/contest-effect-data-client';
import { ContestCard } from '../../../components/contest/contest-card/contest-card';
import { SuperContestEffectDataClient } from '../../../services/super-contest-effect-data-client';
import { SuperContestCard } from '../../../components/contest/super-contest-card/super-contest-card';

@Component({
  selector: 'app-contest',
  imports: [ContestCard, SuperContestCard],
  templateUrl: './contest.html',
  styleUrl: './contest.scss',})


export class Contest {
  movesDataClient = inject(MovesDataClient);
  contestTypeDataClient = inject(ContestTypeDataClient);
  contestEffectDataClient = inject(ContestEffectDataClient);
  superContestDataClient = inject(SuperContestEffectDataClient);

  superContestError = signal('');

  public contestCombos = signal<ContestCombo>({
    normal: {
      use_before: [],
      use_after: [],
    },
    super: {
      use_before: [],
      use_after: [],
    },
  });

  contestHasData = computed(() =>
    !!this.movesDataClient.moveContestEffectUrl()
  );

  superContestHasData = computed(() =>
    !!this.movesDataClient.moveSuperContestEffectUrl()
  );

  contestLoading = computed(() =>
    this.contestTypeDataClient.contestTypeLoading() ||
    this.contestEffectDataClient.contestEffectLoading()
  );

  contestError = computed(() =>
    this.contestTypeDataClient.contestTypeError() ||
    this.contestEffectDataClient.contestEffectError()
  );

  superContestLoading = computed(() =>
    this.superContestDataClient.superContestEffectLoading()
  );

  superContestErrorState = computed(() =>
    this.superContestDataClient.superContestEffectError()
  );

  contestCombosEffect = effect(() => {
    const combos = this.movesDataClient.moveContestCombos();

    if (combos) {
      this.contestCombos.set(combos);
    }
  });

  contestTypeEffect = effect(() => {
    this.contestTypeDataClient.url.set(
      this.movesDataClient.moveContestTypeUrl() as string
    );
  });

  contestEffectEffect = effect(() => {
    this.contestEffectDataClient.url.set(
      this.movesDataClient.moveContestEffectUrl() as string
    );
  });

  superContestEffect = effect(() => {
    this.superContestDataClient.url.set(
      this.movesDataClient.moveSuperContestEffectUrl()as string
    );
  });
}

