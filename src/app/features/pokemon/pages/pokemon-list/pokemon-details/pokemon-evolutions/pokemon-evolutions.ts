import { Component, computed, effect, inject, signal } from '@angular/core';
import { PokemonSpeciesDetailsDataClient } from '../../../../services/pokemon-species-details-data-client';
import { EvolutionChainDataClient } from '../../../../services/evolution-chain-data-client';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';
import { REGIONAL_FAMILIES } from '../../../../../../shared/constants/regional-families-map';
import { PokemonListItem } from "../../../../components/pokemon-list-item/pokemon-list-item";
import { PokemonEvolutionsDetails } from "./pokemon-evolutions-details/pokemon-evolutions-details";

@Component({
  selector: 'app-pokemon-evolutions',
  imports: [PokemonListItem, PokemonEvolutionsDetails],
  templateUrl: './pokemon-evolutions.html',
  styleUrl: './pokemon-evolutions.scss',
})
export class PokemonEvolutions {
  pokemonData = inject(PokemonDetailsDataClient);
  speciesData = inject(PokemonSpeciesDetailsDataClient);
  evolutionsData = inject(EvolutionChainDataClient);
  url = signal<string>('');


public checkVariantPokemonName = computed(() => {
  const pokemonName = this.pokemonData.pokemonDetails()?.name; // Executa o sinal para obter a string

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
    this.url.set(this.speciesData.pokemonSpeciesDetails()?.evolution_chain.url as string);
    this.evolutionsData.evolutionChainUrl.set(this.url());
  })
}
