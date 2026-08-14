import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveDetails } from './pokemon-move-details';

describe('LevelUpMoves', () => {
  let component: PokemonMoveDetails;
  let fixture: ComponentFixture<PokemonMoveDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMoveDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonMoveDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
