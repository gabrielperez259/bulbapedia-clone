import { Component, inject } from '@angular/core';
import { GenValues } from '../../../../shared/utils/gen-values';
import { PokemonListDataClient } from '../../services/pokemon-list-data-client';
import { SelectByGenBar } from '../../components/select-by-gen-bar/select-by-gen-bar';
import { PokemonListItem } from '../../components/pokemon-list-item/pokemon-list-item';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';

@Component({
  selector: 'app-pokemon-list',
  imports: [SelectByGenBar, PokemonListItem, SearchBar],
  providers: [PokemonListDataClient],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  readonly data = inject(PokemonListDataClient);

  setGenValue(generation: GenValues) {
    this.data.setGeneration(generation);
  }

  goToPreviousPage() {
    this.data.setPage(this.data.currentPage() - 1);
  }

  goToNextPage() {
    this.data.setPage(this.data.currentPage() + 1);
  }
}
