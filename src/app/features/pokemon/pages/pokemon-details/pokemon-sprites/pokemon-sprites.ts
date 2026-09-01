import { Component, computed, inject } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { PokemonSpeciesDetailsDataClient } from '../../../services/pokemon-species-details-data-client';
import {
  GenerationSpritesCard,
  GenerationSpriteGroup,
} from '../../../components/generation-sprites-card/generation-sprites-card';
import { mapSpriteVersionsToGroups } from '../../../utils/map-sprite-versions';

@Component({
  selector: 'app-pokemon-sprites',
  standalone: true,
  imports: [GenerationSpritesCard],
  templateUrl: './pokemon-sprites.html',
  styleUrl: './pokemon-sprites.scss',
})
export class PokemonSprites {
  private pokemonDetailsData = inject(PokemonDetailsDataClient);
  private pokemonSpeciesDetailsData = inject(PokemonSpeciesDetailsDataClient);

  public pokemon = computed(() => this.pokemonDetailsData.pokemonDetails());
  public isLoading = computed(
    () =>
      this.pokemonDetailsData.pokemonDetailsLoading() ||
      this.pokemonSpeciesDetailsData.pokemonSpeciesDetailsLoading(),
  );
  public error = computed(
    () =>
      this.pokemonDetailsData.pokemonDetailsError() ||
      this.pokemonSpeciesDetailsData.pokemonSpeciesDetailsError(),
  );

  public generationGroups = computed<GenerationSpriteGroup[]>(() => {
    const introducedGeneration =
      this.pokemonSpeciesDetailsData.pokemonSpeciesDetails()?.generation?.name;

    if (!introducedGeneration) return [];

    return mapSpriteVersionsToGroups(this.pokemon()?.sprites?.versions, introducedGeneration);
  });
}
