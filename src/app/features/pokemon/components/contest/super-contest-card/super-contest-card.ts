import { Component, input } from '@angular/core';
import { ContestCombo } from '../../../models/contest/contest.interface';

@Component({
  selector: 'app-super-contest-card',
  imports: [],
  templateUrl: './super-contest-card.html',
  styleUrl: './super-contest-card.scss',
})
export class SuperContestCard {
  contestCombos = input.required<ContestCombo>();  
  superContestEffectFlavorText = input.required<string>();
  superContestAppeal = input.required<number>();
  
}
