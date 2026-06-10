import { Component, effect, inject, signal } from '@angular/core';
import { PokemonSpeciesDetailsDataClient } from '../../services/pokemon-species-details-data-client';
import { EvolutionChainDataClient } from '../../services/evolution-chain-data-client';
import { PokemonListItem } from "../pokemon-list-item/pokemon-list-item";
import { CleanTextPipe } from "../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-evolution',
  imports: [ PokemonListItem, CleanTextPipe],
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
