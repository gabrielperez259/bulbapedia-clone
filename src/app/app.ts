import { Component, signal } from '@angular/core';
import { Home } from './features/pokemon/pages/home/home';
import { PokemonList } from "./features/pokemon/pages/pokemon-list/pokemon-list";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bulbapedia');
}
