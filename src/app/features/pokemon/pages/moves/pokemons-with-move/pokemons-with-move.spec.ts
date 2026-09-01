import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsWithMove } from './pokemons-with-move';

describe('PokemonsWithMove', () => {
  let component: PokemonsWithMove;
  let fixture: ComponentFixture<PokemonsWithMove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsWithMove],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsWithMove);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
