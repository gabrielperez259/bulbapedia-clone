import { Component, input, signal,  } from '@angular/core';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { RouterLink } from '@angular/router';
import { Transparency } from '../../../../shared/directives/transparency';
import { Pokemon } from '../../models/pokemon';




@Component({
  selector: 'app-name',
  imports: [CapitalizeWordsPipe, RouterLink, Transparency],
  templateUrl: './name.html',
  styleUrl: './name.scss'
})
export class Name {

  pokemonName = input.required<string>()
  route = input<string>()
  isTransparent = input.required<boolean>()
  
}
