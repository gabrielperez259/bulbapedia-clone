import { Component, effect, inject, input } from '@angular/core';
import { AbilityDataClient } from '../../services/ability-data-client';
import { CleanTextPipe } from '../../../../shared/pipes/clean-text.pipe';

@Component({
  selector: 'app-ability-description',
  imports: [CleanTextPipe],
   providers: [AbilityDataClient],
  templateUrl: './ability-description.html',
  styleUrl: './ability-description.scss',
})
export class AbilityDescription {
  abilityName = input.required();
  abilityDataClient = inject(AbilityDataClient);

  abilityDataClientEffect = effect(() => {
    this.abilityDataClient.abilityName.set(this.abilityName() as string);
  });
}
