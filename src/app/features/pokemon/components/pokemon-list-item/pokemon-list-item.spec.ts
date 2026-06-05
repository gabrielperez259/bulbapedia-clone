import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListItem } from './pokemon-list-item';

describe('PokemonListItem', () => {
  let component: PokemonListItem;
  let fixture: ComponentFixture<PokemonListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
