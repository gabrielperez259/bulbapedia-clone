import { Component, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Pokemon } from '../../models/pokemon';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { ColorTypes } from '../../models/types/color-types';
import { ColorTypePipe } from "../../../../shared/pipes/color-type.pipe";
import { Types } from "../types/types";


@Component({
  selector: 'app-pokemon-card',
  imports: [CapitalizeWordsPipe, ColorTypePipe, Types],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCard {
  
  pokemon = input.required<Pokemon | undefined>()

  

}
