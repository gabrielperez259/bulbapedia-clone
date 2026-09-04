import { Component, effect, inject, signal } from '@angular/core';
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
  styleUrl: './contest.scss',
})
export class Contest {
  movesDataClient = inject(MovesDataClient);
  contestTypeDataClient = inject(ContestTypeDataClient);
  contestEffectDataClient = inject(ContestEffectDataClient);
  superContestDataClient = inject(SuperContestEffectDataClient);

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

  contestCombosEffect = effect(() => {
    this.contestCombos.set(this.movesDataClient.moveContestCombos()!);
  });

  contestTypeEffect = effect(() => {
    if (!this.movesDataClient.moveContestTypeName()) {
      this.contestTypeDataClient.search.set(this.movesDataClient.moveContestTypeName()!);  
    }
    
  });

  contestEffectEffect = effect(() => {
    if (this.movesDataClient.moveContestEffect()) {
      this.contestEffectDataClient.url.set(this.movesDataClient.moveContestEffect()!);
    }
  });

  superContestEffect = effect(() => {
    if (!this.movesDataClient.moveSuperContestEffect()) {
      this.superContestDataClient.url.set(this.movesDataClient.moveSuperContestEffect()!);
    }
    
  });
}
