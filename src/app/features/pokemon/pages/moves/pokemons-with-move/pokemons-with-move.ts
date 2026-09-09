import { Component, inject, input } from '@angular/core';
import { MovesDataClient } from '../../../services/moves-data-client';
import { PokemonListItem } from "../../../components/pokemon-list-item/pokemon-list-item";

@Component({
  selector: 'app-pokemons-with-move',
  imports: [PokemonListItem],
  templateUrl: './pokemons-with-move.html',
  styleUrl: './pokemons-with-move.scss',
})
export class PokemonsWithMove {

  
  moveDataClient = inject(MovesDataClient);
}
