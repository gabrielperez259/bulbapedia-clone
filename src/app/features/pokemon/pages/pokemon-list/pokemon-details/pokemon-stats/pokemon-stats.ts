import { Component, computed, inject } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';
import { Stats as StatsComponent } from '../../../../components/stats/stats';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [StatsComponent],
  templateUrl: './pokemon-stats.html',
  styleUrl: './pokemon-stats.scss',
})
export class PokemonStats {
  private pokemonDetailsData = inject(PokemonDetailsDataClient);

  public stats = computed(() => this.pokemonDetailsData.pokemonDetails()?.stats ?? []);
  public isLoading = computed(() => this.pokemonDetailsData.pokemonDetailsLoading());
  public error = computed(() => this.pokemonDetailsData.pokemonDetailsError());
}
