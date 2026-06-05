import { Component, computed, inject, signal } from '@angular/core';
import { PokemonListDataClient } from '../../services/pokemon-list-data-client';
import { SelectByGenBar } from '../../components/select-by-gen-bar/select-by-gen-bar';
import { PokemonListItem } from '../../components/pokemon-list-item/pokemon-list-item';
import { Grid } from '../../../../shared/components/grid/grid';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';

@Component({
  selector: 'app-pokemon-list',
  imports: [SelectByGenBar, PokemonListItem, Grid, SearchBar],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  protected data = inject(PokemonListDataClient);
  public search = signal('');

  setData(value: string) {
    this.data.search.set(value);
  }

  computedData = computed(() =>
    this.data.pokemonList().filter((pokemon) => pokemon.name.includes(this.search().toLowerCase())),
  );
}
