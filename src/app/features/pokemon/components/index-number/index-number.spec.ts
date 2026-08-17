import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNumber } from './index-number';
import { Transparency } from "../../../../shared/directives/transparency";
import { By } from "@angular/platform-browser";
import { inputBinding, signal } from "@angular/core";

describe('IndexNumber', () => {
  let component: IndexNumber;
  let fixture: ComponentFixture<IndexNumber>;

  let pokemonIndexNumber = signal<number | null>(null);
  let transparentBinding = signal<boolean | null>(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexNumber, {
      bindings: [
        inputBinding('pokemonIndexNumber', pokemonIndexNumber ),
        inputBinding('isTransparent', transparentBinding),
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

  it('should render pokemon index number on the dom', async () => {
    pokemonIndexNumber.set(1);
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('0001');
  });
});
