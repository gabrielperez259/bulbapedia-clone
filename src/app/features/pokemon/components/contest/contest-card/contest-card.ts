import { Component, computed, input } from '@angular/core';
import { ContestCombo } from '../../../models/contest/contest.interface';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";
import { ContestConditionColorTypes } from '../../../../../shared/utils/color-types';
import { ContestType } from "../contest-type/contest-type";

@Component({
  selector: 'app-contest-card',
  imports: [CleanTextPipe, ContestType],
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

contestConditionColor = computed(() => {
  const condition = this.contestTypeName()
    ?.toLowerCase();

  return ContestConditionColorTypes[
    condition as keyof typeof ContestConditionColorTypes
  ] ?? '';
});
  
}
