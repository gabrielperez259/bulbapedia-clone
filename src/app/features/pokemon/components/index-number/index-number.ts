import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-index-number',
  imports: [],
  templateUrl: './index-number.html',
  styleUrl: './index-number.scss'
})
export class IndexNumber {

  pokemonIndexNumber = input.required({ transform: numberAttribute });

}
