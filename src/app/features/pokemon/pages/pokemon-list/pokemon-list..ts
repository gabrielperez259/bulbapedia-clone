import { Component, inject, signal } from '@angular/core';
import { PokemonResource } from '../../services/pokemon-resource';

@Component({
  selector: 'app-pokemon-list',
  imports: [],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonList {
  search = signal('');
  private genValue = signal('');
  pokemons = inject(PokemonResource).pokemonsData(this.search, this.genValue);

  ngOnInit(): void {

  }




  setGenOneValue() {
    this.genValue.set('offset=0&limit=151');

  }

  setGenTwoValue() {
    this.genValue.set('offset=151&limit=100');
  }

  setGenThreeValue() {
    this.genValue.set('offset=251&limit=135');
  }

  setGenFourValue() {
    this.genValue.set('offset=386&limit=107');
  }

  setGenFiveValue() {
    this.genValue.set('offset=493&limit=156');
  }

  setGenSixValue() {
    this.genValue.set('offset=649&limit=72');
  }

  setGenSevenValue() {
    this.genValue.set('offset=721&limit=88');
  }

  setGenEightValue() {
    this.genValue.set('offset=809&limit=96');
  }

  setGenNineValue() {
    this.genValue.set('offset=905&limit=88');
  }
}
