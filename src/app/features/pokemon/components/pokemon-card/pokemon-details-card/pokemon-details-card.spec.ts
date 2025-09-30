import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsCard } from './pokemon-details-card';

describe('PokemonDetailsCard', () => {
  let component: PokemonDetailsCard;
  let fixture: ComponentFixture<PokemonDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
