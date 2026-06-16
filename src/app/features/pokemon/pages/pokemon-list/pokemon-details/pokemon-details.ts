import { Component, inject, input, effect, model } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { PokemonDetailsCard } from '../../../components/pokemon-card/pokemon-details-card/pokemon-details-card';
import { SideBar } from '../../../components/side-bar/side-bar';
import { RouterOutlet } from '@angular/router';
import { Flex } from '../../../../../shared/components/flex/flex';
import { PokemonSpeciesDetailsDataClient } from '../../../services/pokemon-species-details-data-client';
import { SelectionBar } from '../../../components/selection-bar/selection-bar';

@Component({
  selector: 'app-pokemon-details',
  imports: [PokemonDetailsCard, SideBar, RouterOutlet, Flex, SelectionBar],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.scss',
})
export class PokemonDetails {
  public name = model<string>('name');

  pokemonDetailsData = inject(PokemonDetailsDataClient);
  speciesDetailsData = inject(PokemonSpeciesDetailsDataClient);

  pokemonNameEffect = effect(() => {
    this.pokemonDetailsData.search.set(this.name());
  });

  pokemonSpecieUrlEffect = effect(() => {
    const specieUrl = this.pokemonDetailsData.pokemonSpecieUrl();
    if (specieUrl) {
      this.speciesDetailsData.url.set(specieUrl);
    }
  });
}
