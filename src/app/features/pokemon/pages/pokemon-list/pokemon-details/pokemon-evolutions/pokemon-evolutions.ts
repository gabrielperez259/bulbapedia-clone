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
  const pokemonName = this.pokemonData.pokemonName();

  if (!pokemonName) return null;

  const family = REGIONAL_FAMILIES[pokemonName as keyof typeof REGIONAL_FAMILIES];

  if (!family) return null;

  // Função auxiliar para garantir que o retorno seja SEMPRE uma array plana
  const evelopeInArray = (evolutionData: any) => {
    if (!evolutionData) return [];
    // Se já for uma array (caso do Slowpoke), retorna ela mesma. Se for objeto, põe na array.
    return Array.isArray(evolutionData) ? evolutionData : [evolutionData];
  };

  return {
    baseForm: family.base,
    firstEvolutions: evelopeInArray(family['first-evolution']),
    secondEvolutions: evelopeInArray(family['second-evolution'])
  };
});
  
  
  evolututionChainValuesEffect = effect(() => {
    this.url.set(this.speciesData.pokemonSpeciesDetails()?.evolution_chain.url as string);
    this.evolutionsData.evolutionChainUrl.set(this.url());
  })
}
