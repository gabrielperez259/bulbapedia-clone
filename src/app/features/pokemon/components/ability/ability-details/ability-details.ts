import { Component, effect, inject, input } from '@angular/core';
import { AbilityDataClient } from '../../../services/ability-data-client';
import { PokemonDetails } from "../../../pages/pokemon-list/pokemon-details/pokemon-details";
import { PokemonListItem } from "../../pokemon-list-item/pokemon-list-item";
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-ability-details',
  imports: [PokemonDetails, PokemonListItem, CleanTextPipe],
  templateUrl: './ability-details.html',
  styleUrl: './ability-details.scss',
})
export class AbilityDetails {

  public name = input<string>('');
  public abilityDataDetails = inject(AbilityDataClient);

  abilityDetailsEffect = effect(() => {
    this.abilityDataDetails.abilityName.set(this.name());
  })

}
