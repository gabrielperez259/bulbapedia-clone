import { Component, computed, input } from '@angular/core';
import { ContestConditionColorTypes } from '../../../../../shared/utils/color-types';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-contest-type',
  imports: [CleanTextPipe],
  templateUrl: './contest-type.html',
  styleUrl: './contest-type.scss',
})
export class ContestType {

  contestTypeName = input.required<string>();
  contestTypeBerryFlavor = input.required<string>();

  contestConditionColor = computed(() => {
    const condition = this.contestTypeName()
      ?.toLowerCase();
  
    return ContestConditionColorTypes[
      condition as keyof typeof ContestConditionColorTypes
    ] ?? '';
  });

}
