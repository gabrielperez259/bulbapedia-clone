import { Component, input, numberAttribute } from '@angular/core';
import { Transparency } from "../../../../shared/directives/transparency";

@Component({
  selector: 'app-index-number',
  imports: [Transparency],
  templateUrl: './index-number.html',
  styleUrl: './index-number.scss'
})
export class IndexNumber {

  pokemonIndexNumber = input.required({ transform: numberAttribute });
  isTransparent = input.required<boolean>();

}
