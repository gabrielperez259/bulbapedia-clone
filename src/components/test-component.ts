import { Component, inject } from '@angular/core';
import { PokemonDataCLient } from '../services/pokemon-data-client';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.html',
  styles: [
  ]
})
export class TestComponent  {


  service = inject(PokemonDataCLient);
  



}
