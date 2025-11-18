import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSpecies } from './pokemon-species';

describe('PokemonSpecies', () => {
  let component: PokemonSpecies;
  let fixture: ComponentFixture<PokemonSpecies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSpecies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSpecies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
