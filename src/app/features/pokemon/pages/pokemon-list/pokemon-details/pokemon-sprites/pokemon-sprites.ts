import { Component, computed, inject } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';
import {
  GenerationSpritesCard,
  GenerationSpriteGroup,
} from '../../../../components/generation-sprites-card/generation-sprites-card';
import { mapSpriteVersionsToGroups } from '../../../../utils/map-sprite-versions';

@Component({
  selector: 'app-pokemon-sprites',
  standalone: true,
  imports: [GenerationSpritesCard],
  templateUrl: './pokemon-sprites.html',
  styleUrl: './pokemon-sprites.scss',
})
export class PokemonSprites {
  private pokemonDetailsData = inject(PokemonDetailsDataClient);

  public pokemon = computed(() => this.pokemonDetailsData.pokemonDetails());
  public isLoading = computed(() => this.pokemonDetailsData.pokemonDetailsLoading());
  public error = computed(() => this.pokemonDetailsData.pokemonDetailsError());

  public generationGroups = computed<GenerationSpriteGroup[]>(() => {
    return mapSpriteVersionsToGroups(this.pokemon()?.sprites?.versions);
  });
}
