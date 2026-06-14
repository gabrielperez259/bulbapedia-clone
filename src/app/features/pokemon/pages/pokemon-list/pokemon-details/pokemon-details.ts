import { Component, inject, input, effect } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { PokemonDetailsCard } from '../../../components/pokemon-card/pokemon-details-card/pokemon-details-card';
import { SideBar } from '../../../components/side-bar/side-bar';
import { RouterOutlet } from '@angular/router';
import { Flex } from '../../../../../shared/components/flex/flex';
import { PokemonSpeciesDetailsDataClient } from '../../../services/pokemon-species-details-data-client';
import { SelectionBar } from '../../../components/selection-bar/selection-bar';
import { Pokemon } from '../../../models/pokemon';

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
  // public pokemon = input.required<Pokemon>();
  pokemonDetailsData = inject(PokemonDetailsDataClient);
  speciesDetailsData = inject(PokemonSpeciesDetailsDataClient);

  pokemonNameEffect = effect(() => {   
    this.pokemonDetailsData.search.set(this.name());
    console.log(this.pokemonDetailsData.pokemonSpecieName());
    this.speciesDetailsData.search.set(this.name().split('-')[0]);
    if(this.name() === 'mr-mime' || this.name() === 'kommo-o' || this.name() === 'hakamo-o'||this.name() === 'jangmo-o ' || this.name() === 'ho-oh') {
      this.speciesDetailsData.search.set(this.name());
    }
  });


}
