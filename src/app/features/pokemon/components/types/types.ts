import { Component, input } from '@angular/core';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { ColorTypePipe } from "../../../../shared/pipes/color-type.pipe";
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-types',
  imports: [CapitalizeWordsPipe, ColorTypePipe],
  templateUrl: './types.html',
  styleUrl: './types.scss'
})
export class Types {

  types = input.required<Pokemon["types"] | undefined>()

}
