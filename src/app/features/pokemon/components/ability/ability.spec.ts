import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ability } from './ability';
import { inputBinding, signal } from "@angular/core";
import { Pokemon } from "../../models/pokemon";
import { createMockPokemonAbilities } from "../../../../../testing/factories/ability-factory";


describe('Ability', () => {
  let component: Ability;
  let fixture: ComponentFixture<Ability>;
  let transparentBinding = signal(false);
  let abilities = signal<Pokemon['abilities']>(createMockPokemonAbilities());
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ability],
    }).compileComponents();

    fixture = TestBed.createComponent(Ability,{
      bindings: [
        inputBinding('abilities', abilities),
        inputBinding('isTransparent', transparentBinding)
      ]
    }

    );
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  // TODO (#008): Solucionar o problema de teste com bindings recebendo array com valores não nulos.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should return expected abilities', () => {
    expect(component.abilities()).toBeTruthy();
  });

  it('should return expected transparent value', () => {
    // quando não existe envolvimento com o dom, o angular entende o valor previamente setado nos bindings
    expect(component.isTransparent()).toBe(false);
  });

  it('should apply expected transparent value', async () => {
    // seleciona o elemento que contém a classe correspondente
    const element = fixture.nativeElement.querySelector('.ability-container');
    // quando o dom recebe um input é necessario seta-lo manualmente              
    element.isTransparent = false;
    element.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(element.isTransparent).toBe(false);
  });

it('deve renderizar o nome da habilidade no DOM', async () => {
  const abilityName = 'overgrow';
  const element = fixture.nativeElement.querySelector('.ability-button span');
  element.ability.ability.name = abilityName;
  element.dispatchEvent(new Event('input'));
  await fixture.whenStable(); 
  expect(element).toBeTruthy();
});
*/
    
});
