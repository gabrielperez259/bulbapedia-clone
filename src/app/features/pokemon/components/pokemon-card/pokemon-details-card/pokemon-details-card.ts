import { Component, input } from '@angular/core';
import { Card } from '../../../../../shared/components/card/card';
import { Flex } from '../../../../../shared/components/flex/flex';
import { IndexNumber } from '../../index-number/index-number';
import { Name } from '../../name/name';
import { Sprite } from '../../sprite/sprite';
import { Pokemon } from '../../../models/pokemon';
import { Types } from '../../types/types';
import { Ability } from '../../ability/ability';
import { ColorTypePipe } from '../../../../../shared/pipes/color-type.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-pokemon-details-card',
  imports: [
    Card,
    Flex,
    IndexNumber,
    Name,
    Sprite,
    Types,
    Ability,
    ColorTypePipe,
    MatTabsModule,
    CleanTextPipe
],
  templateUrl: './pokemon-details-card.html',
  styleUrl: './pokemon-details-card.scss',
})
export class PokemonDetailsCard {
  public pokemon = input.required<Pokemon | undefined>();
}
