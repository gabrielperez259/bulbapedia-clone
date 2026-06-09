import { Component, inject, input, OnInit, ChangeDetectionStrategy, effect } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { PokemonDetailsCard } from '../../../components/pokemon-card/pokemon-details-card/pokemon-details-card';
import { SideBar } from '../../../components/side-bar/side-bar';
import { RouterOutlet } from '@angular/router';
import { Flex } from '../../../../../shared/components/flex/flex';
import { PokemonSpeciesDetailsDataClient } from '../../../services/pokemon-species-details-data-client';
import { SelectionBar } from '../../../components/selection-bar/selection-bar';

@Component({
  selector: 'app-pokemon-details',
  imports: [
    PokemonDetailsCard,
    SideBar,
    RouterOutlet,
    Flex,
    SelectionBar,
  ],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.scss',
})
export class PokemonDetails {
  public name = input<string>('name');
  pokemonData = inject(PokemonDetailsDataClient);
  speciesData = inject(PokemonSpeciesDetailsDataClient);

  pokemonNameSearchValuesEffect = effect(() => {
    this.pokemonData.search.set(this.name());
    this.speciesData.search.set(this.name());

  });
  
}
