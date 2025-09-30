import { Component, input, signal } from '@angular/core';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-name',
  imports: [CapitalizeWordsPipe, RouterLink],
  templateUrl: './name.html',
  styleUrl: './name.scss'
})
export class Name {

  pokemonName = input.required<string>()
  route = input<string>()
  
}
