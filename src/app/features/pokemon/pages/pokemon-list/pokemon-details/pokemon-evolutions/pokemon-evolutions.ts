import { Component, effect, inject, signal } from '@angular/core';
import { PokemonSpeciesDetailsDataClient } from '../../../../services/pokemon-species-details-data-client';
import { EvolutionChainDataClient } from '../../../../services/evolution-chain-data-client';

@Component({
  selector: 'app-pokemon-evolutions',
  imports: [],
  templateUrl: './pokemon-evolutions.html',
  styleUrl: './pokemon-evolutions.scss',
})
export class PokemonEvolutions {
  specieData = inject(PokemonSpeciesDetailsDataClient);
  evolutionsData = inject(EvolutionChainDataClient);
  url = signal<string>('');
  
  
  evolututionChainValuesEffect = effect(() => { 
    this.url.set(this.specieData.pokemonSpeciesDetails()?.evolution_chain.url as string);
    this.evolutionsData.evolutionChainUrl.set(this.url());
  })
}
