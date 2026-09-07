import { Component, input, ChangeDetectionStrategy, effect } from '@angular/core';
import { PokemonItemListCard } from '../pokemon-card/pokemon-item-list-card/pokemon-item-list-card';
import { NamedApiResource } from '../../../../shared/models/api-resource';


@Component({
  selector: 'app-pokemon-list-item',
  imports: [PokemonItemListCard],
  templateUrl: './pokemon-list-item.html',
  styleUrl: './pokemon-list-item.scss',
})
export class PokemonListItem {
  pokemon = input.required<NamedApiResource>();
  route = input.required<string>();

}
