import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvolutionsDetails } from './pokemon-evolutions-details';

describe('PokemonEvolutionsDetails', () => {
  let component: PokemonEvolutionsDetails;
  let fixture: ComponentFixture<PokemonEvolutionsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonEvolutionsDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonEvolutionsDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
