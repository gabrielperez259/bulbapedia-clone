import { Component, inject } from '@angular/core';
import { PokemonListDataClient } from '../../services/pokemon-list-data-client';
import { RouterLink } from '@angular/router';
import { GenValues } from '../../../../shared/utils/gen-values';

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonList {  
  
  data = inject(PokemonListDataClient);
  
  
  setGenOneValue() {    
    this.data.search.set(GenValues.GenOne);    
    
  }

  setGenTwoValue() {
    this.data.search.set(GenValues.GenTwo);
    
  }

  setGenThreeValue() {
    this.data.search.set(GenValues.GenThree);
    
  }

  setGenFourValue() {
    this.data.search.set(GenValues.GenFour);
    
  }

  setGenFiveValue() {
    this.data.search.set(GenValues.GenFive);
    
  }

  setGenSixValue() {
    this.data.search.set(GenValues.GenSix);
    
  }

  setGenSevenValue() {
    this.data.search.set(GenValues.GenSeven);
    
  }

  setGenEightValue() {
    this.data.search.set(GenValues.GenEight);
    
  }

  setGenNineValue() {
    this.data.search.set(GenValues.GenNine);
    
  }
}
