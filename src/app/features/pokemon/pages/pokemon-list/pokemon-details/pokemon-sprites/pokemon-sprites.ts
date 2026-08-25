import { Component, computed, inject } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';
import { SpriteCard } from '../../../../components/sprite-card/sprite-card';
import { GenerationSpritesCard } from "../../../../components/generation-sprites-card/generation-sprites-card";

export interface SpriteItem {
  url: string;
  label: string;
}

@Component({
  selector: 'app-pokemon-sprites',
  standalone: true,
  imports: [SpriteCard, GenerationSpritesCard],
  templateUrl: './pokemon-sprites.html',
  styleUrl: './pokemon-sprites.scss',
})
export class PokemonSprites {
  private pokemonDetailsData = inject(PokemonDetailsDataClient);

  public pokemon = computed(() => this.pokemonDetailsData.pokemonDetails());
  public isLoading = computed(() => this.pokemonDetailsData.pokemonDetailsLoading());
  public error = computed(() => this.pokemonDetailsData.pokemonDetailsError());

  public spriteList = computed<SpriteItem[]>(() => {
    const details = this.pokemon();
    if (!details || !details.sprites) return [];

    const items: SpriteItem[] = [];
    const s = details.sprites;

    if (s.front_default) items.push({ url: s.front_default, label: 'Front Default' });
    if (s.back_default) items.push({ url: s.back_default, label: 'Back Default' });
    if (s.front_shiny) items.push({ url: s.front_shiny, label: 'Front Shiny' });
    if (s.back_shiny) items.push({ url: s.back_shiny, label: 'Back Shiny' });

    return items;
  });
}
