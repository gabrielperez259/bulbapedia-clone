import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItemListCard } from './pokemon-item-list-card';
import { provideRouter } from "@angular/router";
import { inputBinding, signal } from "@angular/core";
import { Pokemon } from "../../../models/pokemon";

describe('PokemonItemListCard', () => {
  let component: PokemonItemListCard;
  let fixture: ComponentFixture<PokemonItemListCard>;
  let pokemon = signal<Pokemon | null>(null);
  let route = signal<string | null>(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonItemListCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonItemListCard, {
      bindings: [inputBinding('pokemon', pokemon), inputBinding('route', route)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
