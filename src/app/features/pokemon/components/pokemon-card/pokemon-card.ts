import { Component, input } from '@angular/core';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { ColorTypePipe } from "../../../../shared/pipes/color-type.pipe";
import { Types } from "../types/types";
import { Ability } from "../ability/ability";
import { Pokemon } from '../../models/pokemon';


@Component({
  selector: 'app-pokemon-card',
  imports: [CapitalizeWordsPipe, ColorTypePipe, Types, Ability],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCard {
  
  pokemon = input.required<Pokemon | undefined>()

  

}
