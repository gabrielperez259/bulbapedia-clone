import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Name } from './name';
import { provideRouter } from "@angular/router";
import { inputBinding, signal } from "@angular/core";
import { Transparency } from "../../../../shared/directives/transparency";
import { By } from "@angular/platform-browser";

describe('Name', () => {
  let component: Name;
  let fixture: ComponentFixture<Name>;

  let transparentBinding = signal<boolean | null>(null);
  let pokemonNameBinding = signal<string | null>(null);
  let routeBinding = signal<string | null>(null);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Name],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Name, {
      bindings: [
        inputBinding('isTransparent', transparentBinding),
        inputBinding('pokemonName', pokemonNameBinding),
        inputBinding('route', routeBinding),
      ],
    });
    component = fixture.componentInstance;
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply expected transparent value to transparency directive', async () => {
    const element = fixture.debugElement.query(By.directive(Transparency));

    transparentBinding.set(true);
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(component.isTransparent()).toBe(true);
    expect(element.injector.get(Transparency).transparency()).toBe(true);
  });
  
  it('should render the pokemon name', async () => {

    const name = fixture.nativeElement.querySelector('.pokemon-name');
    
    pokemonNameBinding.set('pikachu');
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable(); 

    expect(name.textContent).toContain('Pikachu');
  });


  it('should set the router link using the provided route', async () => {
    const link = fixture.nativeElement.querySelector('.pokemon-name');

    routeBinding.set('pokemon/pikachu');
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();     

    expect(link.getAttribute('href')).toBe('/pokemon/pikachu');
  });

  
});
