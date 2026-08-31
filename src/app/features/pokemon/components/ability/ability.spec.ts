import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ability } from './ability';
import { inputBinding, signal } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { createMockPokemonAbilities } from '../../../../../testing/factories/ability-factory';
import { provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ABILITY_ROUTE } from './ability.route';
import { Transparency } from '../../../../shared/directives/transparency';

describe('Ability', () => {
  let component: Ability;
  let fixture: ComponentFixture<Ability>;
  let compiled: HTMLElement;
  let transparentBinding = signal<boolean | null>(null);
  let abilities = signal<Pokemon['abilities']>([]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ability],
      providers: [
        provideRouter([{ path: ':name', children: ABILITY_ROUTE }]),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Ability, {
      bindings: [
        inputBinding('abilities', abilities),
        inputBinding('isTransparent', transparentBinding),
      ],
    });
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return expected abilities', () => {
    expect(component.abilities()).toBeTruthy();
  });

  it('should apply expected transparent value to transparency directive', async () => {
    const element = fixture.debugElement.query(By.directive(Transparency));

    transparentBinding.set(true);
    
    await fixture.whenStable();

    expect(component.isTransparent()).toBe(true);
    expect(element.injector.get(Transparency).transparency()).toBe(true);
  });

  it('should render name ability on the dom', async () => {
    const abilityNameOne = 'Ability One';

    abilities.set(createMockPokemonAbilities());
    compiled.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(compiled.querySelector('.ability-name-span')?.textContent).contains(abilityNameOne);
  });

  it('should redirect to ability details when clicked on ability-name link', async () => {
    abilities.set(createMockPokemonAbilities());
    compiled.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    transparentBinding.set(false);
    compiled.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    // 2. Busca o link renderizado no HTML da instância 'fixture'
    const linkDebugEl = fixture.debugElement.query(By.css('.ability-link, a'));

    // 3. Clia no elemento para disparar o [routerLink]
    const linkElement: HTMLAnchorElement = linkDebugEl.nativeElement;
    linkElement.click();

    await fixture.whenStable();

    // 4. Valida se a URL mudou
    const router = TestBed.inject(Router);
    expect(router.url).toContain('/ability-one'); // ajuste conforme seu mock
  });

  it('should not render any ability links when abilities list is empty', async () => {
    // 1. Define a signal com um array vazio
    abilities.set([]);
    compiled.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    transparentBinding.set(false);
    compiled.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    // 2. Tenta buscar os links de habilidade no DOM
    const linkDebugEl = fixture.debugElement.query(By.css('.ability-link'));
    const buttonDebugEl = fixture.debugElement.query(By.css('.ability-button'));

    // 3. Valida que nenhum elemento do loop @for foi renderizado
    expect(linkDebugEl).toBeNull();
    expect(buttonDebugEl).toBeNull();
  });
});
