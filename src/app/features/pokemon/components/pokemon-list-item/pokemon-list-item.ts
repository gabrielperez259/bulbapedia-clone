import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Results } from '../../models/results';
import { PokemonItemListCard } from "../pokemon-card/pokemon-item-list-card/pokemon-item-list-card";

@Component({
  selector: 'app-pokemon-list-item',
  imports: [PokemonItemListCard],
  templateUrl: './pokemon-list-item.html', 
  styleUrl: './pokemon-list-item.scss'
})
export class PokemonListItem {

  pokemon = input.required<Results>();
  route = input.required<string>();

}
