import { Component, input } from '@angular/core';
import { EvolutionChain } from '../../../../../models/evolution/evolution';
import { EvolutionChainDetails } from "../../../../../components/evolution/evolution-chain-details/evolution-chain-details";

@Component({
  selector: 'app-pokemon-evolutions-details',
  imports: [ EvolutionChainDetails],
  templateUrl: './pokemon-evolutions-details.html',
  styleUrl: './pokemon-evolutions-details.scss',
})
export class PokemonEvolutionsDetails {

  evolutionChain = input.required<EvolutionChain>();
  isFirstEvolution = input.required<boolean>();
  isSecondEvolution = input.required<boolean>();
  isRegionalVariant = input.required<boolean>();
  isBaseDefaultWithVariantEvolution = input.required<boolean>();
  pokemonName = input.required<string>();
}
