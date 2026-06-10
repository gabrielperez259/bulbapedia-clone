import { Component, computed, effect, inject, signal } from '@angular/core';
import { PokemonSpeciesDetailsDataClient } from '../../services/pokemon-species-details-data-client';
import { EvolutionChainDataClient } from '../../services/evolution-chain-data-client';
import { PokemonListItem } from "../pokemon-list-item/pokemon-list-item";
import { CleanTextPipe } from "../../../../shared/pipes/clean-text.pipe";
import { PokemonDetailsDataClient } from '../../services/pokemon-details.data-client';
import { REGIONAL_FAMILIES } from '../../../../shared/constants/regional-families-map';

@Component({
  selector: 'app-evolution',
  imports: [ PokemonListItem, CleanTextPipe],
  templateUrl: './evolution.html',
  styleUrl: './evolution.scss',
})
export class Evolution {
  pokemonId = inject(PokemonDetailsDataClient).pokemonDetails()!.id;
  pokemonName = inject(PokemonDetailsDataClient).pokemonDetails()!.name;
  speciesData = inject(PokemonSpeciesDetailsDataClient);
  evolutionsData = inject(EvolutionChainDataClient);
  url = signal<string>('');


public checkVariantPokemonName = computed(() => {
  const pokemonName = this.pokemonName; // Executa o sinal para obter a string

  if (!pokemonName) return null;

  // Busca a família direta no mapa (funciona para base ou evolução)
  const family = REGIONAL_FAMILIES[pokemonName as keyof typeof REGIONAL_FAMILIES];

  if (!family) {
    return null; // Não é uma variação regional mapeada
  }

  return {
    baseForm: family.base,
    evolutions: family.evolutions
  };
});
  
  
  evolututionChainValuesEffect = effect(() => {
    console.log(this.pokemonName);
    this.url.set(this.speciesData.pokemonSpeciesDetails()?.evolution_chain.url as string);
    this.evolutionsData.evolutionChainUrl.set(this.url());
  })

}
