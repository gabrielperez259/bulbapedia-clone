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
  hasVariant = input.required<boolean>();
  pokemonName = input.required<string>();

  getBaseName(name: string): string {
  // Remove sufixos regionais comuns da PokeAPI
  return name.replace(/-(galar|alola|hisui|paldea|gmax|mega)/g, '');
  
}
isCurrentPokemonFromRegion(regionName: string): boolean {
  return this.pokemonName().endsWith(`-${regionName}`);
}

// Verifica se o Pokémon atual é a forma padrão (Kanto/Original), ou seja, não tem sufixo de variante
isCurrentPokemonDefaultForm(): boolean {
  const regions = ['alola', 'galar', 'hisui', 'paldea'];
  // Retorna true se o nome do pokemon NÃO terminar com nenhuma dessas regiões
  return !regions.some(region => this.pokemonName().endsWith(`-${region}`));
}
}
