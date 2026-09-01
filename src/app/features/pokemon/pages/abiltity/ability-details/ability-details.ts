import { Component, effect, inject, input } from '@angular/core';
import { AbilityDataClient } from '../../../services/ability-data-client';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";
import { PokemonListItem } from '../../../components/pokemon-list-item/pokemon-list-item';

@Component({
  selector: 'app-ability-details',
  imports: [PokemonListItem, CleanTextPipe],
  templateUrl: './ability-details.html',
  styleUrl: './ability-details.scss',
})
export class AbilityDetails {

  public name = input<string>('', { alias: 'name' });
  public abilityDataDetails = inject(AbilityDataClient);

  abilityDetailsEffect = effect(() => {
    this.abilityDataDetails.abilityName.set(this.name());
  })

}
