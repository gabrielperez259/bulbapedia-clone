import { Component, input } from '@angular/core';
import { ContestCombo } from '../../../models/contest/contest.interface';
import { ContestType } from "../contest-type/contest-type";

@Component({
  selector: 'app-super-contest-card',
  imports: [ContestType],
  templateUrl: './super-contest-card.html',
  styleUrl: './super-contest-card.scss',
})
export class SuperContestCard {
  contestCombos = input.required<ContestCombo>();
  contestTypeName = input.required<string>();
  contestTypeBerryFlavor = input.required<string>();  
  superContestEffectFlavorText = input.required<string>();
  superContestAppeal = input.required<number>();
  
}
