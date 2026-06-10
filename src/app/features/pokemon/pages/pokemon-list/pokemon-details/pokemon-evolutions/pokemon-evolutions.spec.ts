import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvolutions } from './pokemon-evolutions';

describe('PokemonEvolutions', () => {
  let component: PokemonEvolutions;
  let fixture: ComponentFixture<PokemonEvolutions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonEvolutions],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonEvolutions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
