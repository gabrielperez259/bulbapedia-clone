import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Card } from "../../../../../shared/components/card/card";
import { Flex } from "../../../../../shared/components/flex/flex";
import { IndexNumber } from "../../index-number/index-number";
import { Name } from "../../name/name";
import { Sprite } from "../../sprite/sprite";
import { Pokemon } from '../../../models/pokemon';
import { Types } from "../../types/types";
import { Ability } from "../../ability/ability";
import { ColorTypePipe } from "../../../../../shared/pipes/color-type.pipe";
import { CapitalizeWordsPipe } from "../../../../../shared/pipes/capitalize-word.pipe";
import { Stats } from '../../stats/stats';
import {MatTabsModule} from '@angular/material/tabs';



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
    CapitalizeWordsPipe, 
    MatTabsModule],
  templateUrl: './pokemon-details-card.html',
  styleUrl: './pokemon-details-card.scss'
})

export class PokemonDetailsCard {

  public pokemon = input.required<Pokemon | undefined>()

}
