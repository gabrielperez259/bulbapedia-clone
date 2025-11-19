import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonSpeciesDetailsDataClient } from '../../services/pokemon-species-details-data-client';
import { EvolutionChainDataClient } from '../../services/evolution-chain-data-client';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";

@Component({
  selector: 'app-evolution',
  imports: [CapitalizeWordsPipe],
  templateUrl: './evolution.html',
  styleUrl: './evolution.scss'
})
export class Evolution implements OnInit {

  specieData = inject(PokemonSpeciesDetailsDataClient);
  evolutionsData = inject(EvolutionChainDataClient);
  url = signal<string>('');
  ngOnInit(): void {
    this.url.set(this.specieData.pokemonSpeciesDetails()?.evolution_chain.url as string);
    this.evolutionsData.evolutionChainUrl.set(this.url());

  }

 


}
