import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PokemonList } from '../pokemon-list/pokemon-list';

@Component({
  selector: 'app-home',
  imports: [PokemonList],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.scss',
})
export class Home {}
