import { Component, signal } from '@angular/core';
import { Home } from './features/pokemon/pages/home/home';


@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bulbapedia');
}
