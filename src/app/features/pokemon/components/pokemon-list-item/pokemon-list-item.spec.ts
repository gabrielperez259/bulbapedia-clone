import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListItem } from './pokemon-list-item';
import { inputBinding, signal } from "@angular/core";
import { Pokemon } from "../../models/pokemon";
import { provideRouter } from "@angular/router";

describe('PokemonListItem', () => {
  let component: PokemonListItem;
  let fixture: ComponentFixture<PokemonListItem>;
  let pokemon = signal<Pokemon | null>(null);
  let route = signal<string | null>(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListItem],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListItem,{
      bindings: [inputBinding('pokemon', pokemon), inputBinding('route', route)],});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
