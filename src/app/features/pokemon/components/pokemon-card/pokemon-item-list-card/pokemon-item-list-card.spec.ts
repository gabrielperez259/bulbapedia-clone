import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItemListCard } from './pokemon-item-list-card';

describe('PokemonItemListCard', () => {
  let component: PokemonItemListCard;
  let fixture: ComponentFixture<PokemonItemListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonItemListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonItemListCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
