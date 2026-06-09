import { Component, effect, inject, signal } from '@angular/core';
import { PokemonSpeciesDetailsDataClient } from '../../services/pokemon-species-details-data-client';
import { EvolutionChainDataClient } from '../../services/evolution-chain-data-client';
import { CapitalizeWordsPipe } from '../../../../shared/pipes/capitalize-word.pipe';
import { PokemonListItem } from "../pokemon-list-item/pokemon-list-item";

@Component({
  selector: 'app-evolution',
  imports: [CapitalizeWordsPipe, PokemonListItem],
  templateUrl: './evolution.html',
  styleUrl: './evolution.scss',
})
export class Evolution {
  specieData = inject(PokemonSpeciesDetailsDataClient);
  evolutionsData = inject(EvolutionChainDataClient);
  url = signal<string>('');
  
  
  evolututionChainValuesEffect = effect(() => {
    console.log(this.specieData.pokemonSpeciesDetails()?.name);
    console.log(this.evolutionsData.evolutionChainUrl());
    this.url.set(this.specieData.pokemonSpeciesDetails()?.evolution_chain.url as string);
    this.evolutionsData.evolutionChainUrl.set(this.url());
  })

}
