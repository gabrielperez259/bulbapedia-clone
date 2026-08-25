import { Component, computed, inject } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';
import { SpriteCard } from '../../../../components/sprite-card/sprite-card';

export interface SpriteItem {
  url: string;
  label: string;
  category: 'default' | 'shiny' | 'female' | 'artwork';
}

@Component({
  selector: 'app-pokemon-sprites',
  standalone: true,
  imports: [SpriteCard],
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

    // Official Artwork
    if (s.other?.['official-artwork']?.front_default) {
      items.push({
        url: s.other['official-artwork'].front_default,
        label: 'Official Artwork',
        category: 'artwork',
      });
    }

    // Default
    if (s.front_default) {
      items.push({ url: s.front_default, label: 'Front Default', category: 'default' });
    }
    if (s.back_default) {
      items.push({ url: s.back_default, label: 'Back Default', category: 'default' });
    }

    // Shiny
    if (s.front_shiny) {
      items.push({ url: s.front_shiny, label: 'Front Shiny', category: 'shiny' });
    }
    if (s.back_shiny) {
      items.push({ url: s.back_shiny, label: 'Back Shiny', category: 'shiny' });
    }

    // Female
    if (s.front_female) {
      items.push({ url: s.front_female, label: 'Front Female', category: 'female' });
    }
    if (s.back_female) {
      items.push({ url: s.back_female, label: 'Back Female', category: 'female' });
    }
    if (s.front_shiny_female) {
      items.push({ url: s.front_shiny_female, label: 'Front Shiny Female', category: 'female' });
    }
    if (s.back_shiny_female) {
      items.push({ url: s.back_shiny_female, label: 'Back Shiny Female', category: 'female' });
    }

    return items;
  });
}
