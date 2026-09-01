import { Component, inject, effect, model } from '@angular/core';
import { PokemonDetailsDataClient } from '../../services/pokemon-details.data-client';
import { PokemonDetailsCard } from '../../components/pokemon-card/pokemon-details-card/pokemon-details-card';
import { RouterOutlet } from '@angular/router';
import { PokemonSpeciesDetailsDataClient } from '../../services/pokemon-species-details-data-client';
import { SelectionBar } from '../../components/selection-bar/selection-bar';
import { Router } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';

@Component({
  selector: 'app-pokemon-details',
  imports: [PokemonDetailsCard, SideBar, RouterOutlet, SelectionBar],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.scss',
})
export class PokemonDetails {
  public name = model<string>('name');
  router = inject(Router);
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
