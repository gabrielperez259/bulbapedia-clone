import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { RangeDiagramComponent } from './range-diagram';

describe('RangeDiagramComponent', () => {
  let fixture: ComponentFixture<RangeDiagramComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeDiagramComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeDiagramComponent);
    fixture.componentRef.setInput('type', 'selected-pokemon-first');

    await fixture.whenStable();

    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one diagram for each battle scenario', () => {
    const scenarios = compiled.querySelectorAll('.battle-scenario');

    expect(scenarios).toHaveLength(5);
  });

  it('should render opponent and user sides in every scenario', () => {
    const scenarios = compiled.querySelectorAll('.battle-scenario');

    scenarios.forEach((scenario) => {
      expect(scenario.querySelector('.opponent-side')).toBeTruthy();
      expect(scenario.querySelector('.user-side')).toBeTruthy();
      expect(scenario.querySelector('.battle-divider')).toBeTruthy();
    });
  });

  it('should render the correct number of pokemon slots for double and triple battles', () => {
    const scenarios = compiled.querySelectorAll('.battle-scenario');

    expect(scenarios[0].querySelectorAll('.pokemon-slot')).toHaveLength(4);
    expect(scenarios[1].querySelectorAll('.pokemon-slot')).toHaveLength(4);

    expect(scenarios[2].querySelectorAll('.pokemon-slot')).toHaveLength(6);
    expect(scenarios[3].querySelectorAll('.pokemon-slot')).toHaveLength(6);
    expect(scenarios[4].querySelectorAll('.pokemon-slot')).toHaveLength(6);
  });

  it('should render possible targets with the possible-target class and icon', () => {
    const possibleTargets = compiled.querySelectorAll('.pokemon-slot.possible-target');

    expect(possibleTargets.length).toBeGreaterThan(0);

    possibleTargets.forEach((slot) => {
      expect(slot.querySelector('.pokemon-icon')?.textContent?.trim()).toBe('◇');
    });
  });

  it('should render the user with the user icon', () => {
    const users = compiled.querySelectorAll('.pokemon-slot.user');

    expect(users).toHaveLength(5);

    users.forEach((user) => {
      expect(user.querySelector('.pokemon-icon')?.textContent?.trim()).toBe('◆');
    });
  });

  it('should not mark allies as possible targets for selected-pokemon-first', () => {
    const userSidePossibleTargets = compiled.querySelectorAll('.user-side .possible-target');

    expect(userSidePossibleTargets).toHaveLength(0);
  });

  it('should render the correct possible targets for selected-pokemon-first', () => {
    const scenarios = compiled.querySelectorAll('.battle-scenario');

    // Triple — user left
    const tripleLeft = scenarios[2];

    expect(tripleLeft.querySelectorAll('.opponent-side .possible-target')).toHaveLength(2);

    // Triple — user center
    const tripleCenter = scenarios[3];

    expect(tripleCenter.querySelectorAll('.opponent-side .possible-target')).toHaveLength(3);

    // Triple — user right
    const tripleRight = scenarios[4];

    expect(tripleRight.querySelectorAll('.opponent-side .possible-target')).toHaveLength(2);
  });
});
