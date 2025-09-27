import { Component, inject } from '@angular/core';
import { PokemonListDataClient } from '../../services/pokemon-list-data-client';
import { RouterLink } from '@angular/router';
import { SelectByGenBar } from "../../components/select-by-gen-bar/select-by-gen-bar";

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink, SelectByGenBar],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonList {  
  
  protected data = inject(PokemonListDataClient);
  
  setData(value: string) {    
    this.data.search.set(value);
  
  }
  

}
