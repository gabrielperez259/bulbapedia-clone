import { Component, inject, input, OnInit, } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { PokemonDetailsCard } from "../../../components/pokemon-card/pokemon-details-card/pokemon-details-card";
import { CapitalizeWordsPipe } from "../../../../../shared/pipes/capitalize-word.pipe";
import { ColorTypePipe } from "../../../../../shared/pipes/color-type.pipe";

@Component({
  selector: 'app-pokemon-details',
  imports: [PokemonDetailsCard, CapitalizeWordsPipe, ColorTypePipe],
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
