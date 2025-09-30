import { Component, ElementRef, inject, signal, viewChild, ViewChild, viewChildren } from '@angular/core';
import { PokemonListDataClient } from '../../services/pokemon-list-data-client';
import { RouterLink } from '@angular/router';
import { SelectByGenBar } from "../../components/select-by-gen-bar/select-by-gen-bar";
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { ExtractIdPipe } from "../../../../shared/pipes/extract-id-pipe";
import { Sprite } from '../../components/sprite/sprite';
import { PokemonListItem } from "./pokemon-list-item/pokemon-list-item";
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
  

}
