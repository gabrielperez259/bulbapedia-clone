import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';

import { MovesDataClient } from '../../../services/moves-data-client';
import { MOVE_TARGETS } from './models/move-target-info';
import { Target } from './target';

describe('Target', () => {
  let fixture: ComponentFixture<Target>;
  let compiled: HTMLElement;

  const movesDataClientMock = {
    moveTarget: signal('specific-move'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Target],
      providers: [      
        {
          provide: MovesDataClient,
          useValue: movesDataClientMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Target);

    await fixture.whenStable();

    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the move target label', () => {
    const label = compiled.querySelector('.range-info h3');

    expect(label?.textContent?.trim()).toBe(
      MOVE_TARGETS['specific-move'].label,
    );
  });

  it('should render the move target description', () => {
    const description = compiled.querySelector('.range-info p');

    expect(description?.textContent?.trim()).toBe(
      MOVE_TARGETS['specific-move'].description,
    );
  });

  it('should render the range diagram', () => {
    const diagram = compiled.querySelector('app-range-diagram');

    expect(diagram).toBeTruthy();
  });

  it('should pass the move target diagram to the range diagram', () => {
    const diagram = fixture.debugElement.query(
      (element) => element.name === 'app-range-diagram',
    );

    expect(diagram.componentInstance.type()).toBe(
      MOVE_TARGETS['specific-move'].diagram,
    );
  });

  it('should render the range legend', () => {
    const legendItems = compiled.querySelectorAll('.legend-item');

    expect(legendItems).toHaveLength(3);
  });

  it('should render the target legend item', () => {
    const target = compiled.querySelector('.legend-indicator.target');

    expect(target).toBeTruthy();
    expect(target?.nextElementSibling?.textContent?.trim()).toBe('Target');
  });

  it('should render the possible target legend item', () => {
    const possibleTarget = compiled.querySelector(
      '.legend-indicator.possible-target',
    );

    expect(possibleTarget).toBeTruthy();
    expect(possibleTarget?.nextElementSibling?.textContent?.trim()).toBe(
      'Possible Target',
    );
  });

  it('should render the user legend item', () => {
    const user = compiled.querySelector('.legend-indicator.user');

    expect(user).toBeTruthy();
    expect(user?.nextElementSibling?.textContent?.trim()).toBe('User');
  });
});