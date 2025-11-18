import { Component, inject, input, OnInit, } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { PokemonDetailsCard } from "../../../components/pokemon-card/pokemon-details-card/pokemon-details-card";
import { SideBar } from "../../../components/side-bar/side-bar";
import { RouterOutlet } from '@angular/router';
import { Flex } from "../../../../../shared/components/flex/flex";

@Component({
  selector: 'app-pokemon-details',
  imports: [PokemonDetailsCard, SideBar, RouterOutlet, Flex],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.scss',
  
})

export class PokemonDetails implements OnInit {

  public name = input<string>('name');  
  data = inject(PokemonDetailsDataClient);  
  
  ngOnInit(): void {
    this.data.search.set(this.name());
  }


}
