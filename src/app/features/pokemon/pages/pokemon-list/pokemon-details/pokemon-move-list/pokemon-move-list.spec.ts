import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveList } from './pokemon-move-list';

describe('Moves', () => {
  let component: PokemonMoveList;
  let fixture: ComponentFixture<PokemonMoveList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMoveList],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonMoveList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
