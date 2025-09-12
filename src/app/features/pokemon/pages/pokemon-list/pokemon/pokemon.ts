import { Component, computed, inject, input, OnInit, Signal, signal } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
  
})
export class Pokemon implements OnInit {

  name = input<string>('name');  
  data = inject(PokemonDetailsDataClient);
  
  
  ngOnInit(): void {
    this.data.search.set(this.name());
  }


}
