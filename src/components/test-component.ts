import { Component, inject, OnInit, signal } from '@angular/core';
import { TestService } from '../services/test-service';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {

    testService = inject(TestService);
    pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    this.testService.getPokemon().subscribe((pokemon) => {
        console.log(pokemon);
      this.pokemon.set(pokemon);
    })
  }

}
