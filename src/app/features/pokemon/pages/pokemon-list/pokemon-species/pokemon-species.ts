import { Component, inject, input, OnInit } from '@angular/core';
import { PokemonSpeciesDetailsDataClient } from '../../../services/pokemon-species-details-data-client';
import {MatTabsModule} from '@angular/material/tabs';
import { Varieties } from '../../../models/species/varieties';

@Component({
  selector: 'app-pokemon-species',
  imports: [MatTabsModule],
  templateUrl: './pokemon-species.html',
  styleUrl: './pokemon-species.scss'
})
export class PokemonSpecies implements OnInit {

  public name = input<string>('name');  


  specieData = inject(PokemonSpeciesDetailsDataClient); 
  public pokemonNames = input<Varieties[] | undefined>(this.specieData.specieVarieties());
  ngOnInit(): void {
    this.specieData.search.set(this.name());
  }

}
