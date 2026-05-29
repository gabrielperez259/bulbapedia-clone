import { Component, computed, inject } from '@angular/core';
import { PokemonListDataClient } from '../../services/pokemon-list-data-client';
import { SelectByGenBar } from "../../components/select-by-gen-bar/select-by-gen-bar";
import { PokemonListItem } from "../../components/pokemon-list-item/pokemon-list-item";
import { Grid } from "../../../../shared/components/grid/grid";

@Component({
  selector: 'app-pokemon-list',
  imports: [SelectByGenBar, PokemonListItem, Grid],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonList {  
  
  protected data = inject(PokemonListDataClient);  

  setData(value: string) {   
    this.data.search.set(value);
  
  }
  
  computedSetData = computed(() => this.data.pokemonList().map( pokemon => pokemon.name.includes("pikachu")));

}
