import { Component, input } from '@angular/core';
import { EvolutionChain } from '../../../../../models/evolution/evolution';
import { EvolutionChainDetails } from '../../../../../components/evolution/evolution-chain-details/evolution-chain-details';

@Component({
  selector: 'app-pokemon-evolutions-details',
  imports: [EvolutionChainDetails],
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
    return !regions.some((region) => this.pokemonName().endsWith(`-${region}`));
  }
  shouldShowEvolutionBranch(evolutionNode: any): boolean {
    // Pega o primeiro detalhe de evolução do nó (se houver)
    const details = evolutionNode.evolution_details?.[0];

    // Se não houver detalhes, exibe por padrão (segurança)
    if (!details) return true;

    const currentName = this.pokemonName(); // ex: 'yamask' ou 'yamask-galar'

    // Caso A: O nó exige uma forma base específica (Ex: Runerigus exige 'yamask-galar')
    if (details.base_form?.name) {
      return currentName === details.base_form.name;
    }

    // Caso B: O nó NÃO exige forma base (Ex: Cofagrigus), mas o Pokémon atual é uma variante regional.
    // Se o usuário está vendo o Yamask-Galar, ele não deve ver o Cofagrigus.
    const isRegional =
      currentName.includes('-galar') ||
      currentName.includes('-alola') ||
      currentName.includes('-hisui') ||
      currentName.includes('-paldea');
    if (!details.base_form?.name && isRegional) {
      return false;
    }

    return true;
  }
}
