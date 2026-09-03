import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header.scss',
})
export class Header {
  readonly searchQuery = signal('');

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onSearchSubmit(event?: Event): void {
    event?.preventDefault();
    const query = this.searchQuery().trim();
    if (query) {
      console.log('Pesquisa global enviada:', query);
    }
  }
}

