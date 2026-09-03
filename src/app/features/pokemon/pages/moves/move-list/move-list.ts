import { Component, ChangeDetectionStrategy, inject, signal, effect, computed } from '@angular/core';
import { MovesDataClient } from '../../../services/moves-data-client';
import { SelectionBar } from '../../../components/selection-bar/selection-bar';
import { SearchBar } from '../../../../../shared/components/search-bar/search-bar';
import { MoveListItem } from '../../../components/move-list-item/move-list-item';
import { POKEMON_TYPES } from '../../../../../shared/utils/color-types';

export type SortColumn = 'name' | 'type' | 'category' | 'power' | 'accuracy' | 'pp';
export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-move-list',
  imports: [SelectionBar, SearchBar, MoveListItem],
  templateUrl: './move-list.html',
  styleUrl: './move-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveListComponent {
  readonly movesData = inject(MovesDataClient);
  readonly selectedType = signal<string>('Normal');
  readonly selectedCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');

  readonly types = signal<string[]>(POKEMON_TYPES);
  readonly categories = signal<string[]>(['All', 'Physical', 'Special', 'Status']);

  readonly sortColumn = signal<SortColumn>('name');
  readonly sortDirection = signal<SortDirection>('asc');

  constructor() {
    effect(() => {
      this.movesData.selectedType.set(this.selectedType());
    });
  }

  onTypeChange(type: string) {
    if (type) {
      this.selectedType.set(type);
    }
  }

  onCategoryChange(category: string) {
    if (category) {
      this.selectedCategory.set(category);
    }
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  toggleSort(column: SortColumn) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  readonly filteredAndSortedMoves = computed(() => {
    let list = this.movesData.movesList();
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory().toLowerCase();
    const cachedMap = this.movesData.cachedDetails();
    const column = this.sortColumn();
    const direction = this.sortDirection();

    // 1. Search filter by Move name
    if (query) {
      list = list.filter((item) => item.name.toLowerCase().includes(query));
    }

    // 2. Category filter
    if (category !== 'all') {
      list = list.filter((item) => {
        const details = cachedMap.get(item.name);
        if (!details) return true; // retain while loading
        return details.damage_class?.name?.toLowerCase() === category;
      });
    }

    // 3. Column sorting
    return [...list].sort((a, b) => {
      const detailsA = cachedMap.get(a.name);
      const detailsB = cachedMap.get(b.name);

      let valA: string | number | null = null;
      let valB: string | number | null = null;

      switch (column) {
        case 'name':
          valA = a.name;
          valB = b.name;
          break;
        case 'type':
          valA = detailsA?.type?.name ?? '';
          valB = detailsB?.type?.name ?? '';
          break;
        case 'category':
          valA = detailsA?.damage_class?.name ?? '';
          valB = detailsB?.damage_class?.name ?? '';
          break;
        case 'power':
          valA = detailsA?.power ?? -1;
          valB = detailsB?.power ?? -1;
          break;
        case 'accuracy':
          valA = detailsA?.accuracy ?? -1;
          valB = detailsB?.accuracy ?? -1;
          break;
        case 'pp':
          valA = detailsA?.pp ?? -1;
          valB = detailsB?.pp ?? -1;
          break;
      }

      let comparison = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else {
        comparison = String(valA ?? '').localeCompare(String(valB ?? ''));
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  });
}
