import { Component, effect, input } from '@angular/core';
import { Card } from '../../../../../shared/components/card/card';
import { IndexNumber } from '../../index-number/index-number';
import { ExtractIdPipe } from '../../../../../shared/pipes/extract-id-pipe';
import { Name } from '../../name/name';
import { Sprite } from '../../sprite/sprite';
import { NamedApiResource } from '../../../../../shared/models/api-resource';


@Component({
  selector: 'app-pokemon-item-list-card',
  imports: [Card, IndexNumber, ExtractIdPipe, Name, Sprite],
  templateUrl: './pokemon-item-list-card.html',
  styleUrl: './pokemon-item-list-card.scss',
})
export class PokemonItemListCard {
  public pokemon = input.required<NamedApiResource>();
  public route = input.required<string>();
}
