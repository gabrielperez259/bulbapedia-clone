import { Component, effect, inject, input } from '@angular/core';
import { AbilityDataClient } from '../../../services/ability-data-client';
import { CleanTextPipe } from '../../../../../shared/pipes/clean-text.pipe';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { AbilityDescription } from '../../../components/ability-description/ability-description';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-abilities',
  imports: [CleanTextPipe, AbilityDescription, RouterLink],
  templateUrl: './pokemon-abilities.html',
  styleUrl: './pokemon-abilities.scss',
})
export class PokemonAbilities {
  
  pokemonDataClient = inject(PokemonDetailsDataClient);


    
}
