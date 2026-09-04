import { Component, input } from '@angular/core';
import { ContestCombo } from '../../../models/contest/contest.interface';

@Component({
  selector: 'app-contest-card',
  imports: [],
  templateUrl: './contest-card.html',
  styleUrl: './contest-card.scss',
})
export class ContestCard {
  contestCombos = input.required<ContestCombo>();
  contestTypeName = input.required<string>();
  contestTypeBerryFlavor = input.required<string>();
  contestEffect = input.required<string>();
  contestEffectAppeal = input.required<number>();
  contestEffectJam = input.required<number>();
  contestEffectFlavorText = input.required<string>();
}
