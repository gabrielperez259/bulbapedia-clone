import { Component, computed, inject, input, OnInit, Signal, signal } from '@angular/core';
import { PokemonResource } from '../../../services/pokemon-resource';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss'
})
export class Pokemon implements OnInit {

  name = input<string>('name');  
  pokemon = inject(PokemonResource).pokemonsDetailsResource(this.name);


  
  ngOnInit(): void {
    
  }


}
