import { Component, inject, input, OnInit, } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { PokemonCard } from "../../../components/pokemon-card/pokemon-card";

@Component({
  selector: 'app-pokemon-details',
  imports: [PokemonCard],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.scss',
  
})
export class PokemonDetails implements OnInit {

  name = input<string>('name');  
  data = inject(PokemonDetailsDataClient);
  
  
  ngOnInit(): void {
    this.data.search.set(this.name());
  }


}
