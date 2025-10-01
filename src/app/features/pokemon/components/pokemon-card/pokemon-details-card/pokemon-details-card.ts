import { Component, input } from '@angular/core';
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
    Stats],
  templateUrl: './pokemon-details-card.html',
  styleUrl: './pokemon-details-card.scss'
})
export class PokemonDetailsCard {

  pokemon = input.required<Pokemon | undefined>()

}
