import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionBar } from './selection-bar';
import { input, inputBinding, model, outputBinding, signal } from '@angular/core';

describe('SelectionBar', () => {
  let component: SelectionBar;
  let fixture: ComponentFixture<SelectionBar>;

  let labelTextBinding = signal<string | null>(null);
  let initialValueBinding = signal<string | null>(null);
  let valuesBinding = signal<string[]>([]);
  let selectedOptionBinding = signal<string | null>(null);
  let selectedOptionOutputBinding = signal<string | null>(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionBar, {
      bindings: [
        inputBinding('labelText', labelTextBinding),
        inputBinding('initialValue', initialValueBinding),
        inputBinding('values', valuesBinding),
        inputBinding('selectedOption', selectedOptionBinding),
        outputBinding('selectedOptionOutput', (event) => console.log(event)),
      ],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach( async () => {
     selectedOptionBinding.set(null);
     fixture.nativeElement.dispatchEvent(new Event('input'));
     await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label text', async () => {
    const labelElement = fixture.nativeElement.querySelector('label');

    labelTextBinding.set('Pokémon');
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(labelElement.textContent).toContain('Pokémon');
  });

  it('should initial value change when another value is selected', async () => {
    valuesBinding.set(['pikachu', 'charmander']);
    initialValueBinding.set('charmander');
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(component.selectedOption()).toBe('charmander');
  });

  it('should render options values', async () => {
    valuesBinding.set(['pikachu', 'charmander']);
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const options = fixture.nativeElement.querySelectorAll('option');

    expect(options[0].textContent).toContain('pikachu');
    expect(options[1].textContent).toContain('charmander');
  });

  it('should change selected option after select be changed', async () => {
    valuesBinding.set(['Fire', 'Water', 'Grass']);

    await fixture.whenStable();

    const select = fixture.nativeElement.querySelector('select');

    select.value = 'Water';
    select.dispatchEvent(new Event('change'));

    await fixture.whenStable();

    expect(component.selectedOption()).toBe('Water');
  });

  it('should emit selected option output', async () => {
    selectedOptionBinding.set('pikachu');
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(selectedOptionOutputBinding()).toBe('pikachu');
  })
});
