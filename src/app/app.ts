import { Component, signal } from '@angular/core';
import { Home } from './features/pokemon/pages/home/home';
import { PokemonList } from "./features/pokemon/pages/pokemon-list/pokemon-list";
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/pages/header/header";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bulbapedia');
}
