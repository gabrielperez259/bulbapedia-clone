import { Component, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Pokemon } from '../../models/pokemon';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { ColorTypes } from '../../models/types/color-types';


@Component({
  selector: 'app-pokemon-card',
  imports: [MatCardModule, CapitalizeWordsPipe],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCard {
  
  pokemon = input.required<Pokemon | undefined>()

  getColorType(type: string) {
    if(type in ColorTypes) {
      return ColorTypes[type as keyof typeof ColorTypes]

    } else  
      return console.log(type)
  }

  

}
