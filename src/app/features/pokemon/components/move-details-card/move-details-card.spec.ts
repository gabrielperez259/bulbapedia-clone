import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoveDetailsCard } from './move-details-card';
import { MoveDetails } from '../../models/moves/move-details';

const ROCK_SLIDE: MoveDetails = {
  name: 'rock-slide',
  power: 75,
  accuracy: 90,
  pp: 10,
  priority: 0,
  effect_chance: 30,
  effect_entries: [],
  type: { name: 'rock', url: '/type/6' },
  damage_class: { name: 'physical', url: '/move-damage-class/2' },
  generation: { name: 'generation-i', url: '/generation/1' },
  past_values: [],
  contest_combos: {
    normal: { use_before: [], use_after: [] },
    super: { use_before: [], use_after: [] },
  },
  contest_type: { name: 'tough', url: '/contest-type/5' },
  contest_effect: '',
  target: { name: 'selected-pokemon', url: '/move-target/4' },
};

describe('MoveDetailsCard', () => {
  let component: MoveDetailsCard;
  let fixture: ComponentFixture<MoveDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveDetailsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MoveDetailsCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render empty state when no move is provided', () => {
    fixture.detectChanges();

    const emptyEl: HTMLElement = fixture.nativeElement.querySelector('.move-card__empty');
    expect(emptyEl).toBeTruthy();
    expect(emptyEl.textContent).toContain('No move data available');
  });

  it('should render the move name', () => {
    fixture.componentRef.setInput('move', ROCK_SLIDE);
    fixture.detectChanges();

    const nameEl: HTMLElement = fixture.nativeElement.querySelector('.move-card__name');
    expect(nameEl.textContent).toContain('Rock Slide');
  });

  it('should render type with a badge', () => {
    fixture.componentRef.setInput('move', ROCK_SLIDE);
    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.move-card__row');
    const typeRow = rows[0];
    const badge: HTMLElement = typeRow.querySelector('.move-card__badge')!;

    expect(typeRow.querySelector('.move-card__label')!.textContent).toContain('Type');
    expect(badge.textContent).toContain('Rock');
  });

  it('should render category with a badge', () => {
    fixture.componentRef.setInput('move', ROCK_SLIDE);
    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.move-card__row');
    const categoryRow = rows[1];
    const badge: HTMLElement = categoryRow.querySelector('.move-card__badge')!;

    expect(categoryRow.querySelector('.move-card__label')!.textContent).toContain('Category');
    expect(badge.textContent).toContain('Physical');
  });

  it('should render power, accuracy, PP, priority, and effect_chance', () => {
    fixture.componentRef.setInput('move', ROCK_SLIDE);
    fixture.detectChanges();

    const values: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.move-card__value');

    // rows: Type(0), Category(1), Power(2), Accuracy(3), PP(4), Priority(5), Eff.Chance(6)
    expect(values[2].textContent).toContain('75');
    expect(values[3].textContent).toContain('90%');
    expect(values[4].textContent).toContain('10');
    expect(values[5].textContent).toContain('0');
    expect(values[6].textContent).toContain('30%');
  });

  it('should render a dash when power is null', () => {
    fixture.componentRef.setInput('move', { ...ROCK_SLIDE, power: null });
    fixture.detectChanges();

    const values: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.move-card__value');
    const dashEl: HTMLElement = values[2].querySelector('.move-card__dash')!;

    expect(dashEl).toBeTruthy();
    expect(dashEl.textContent).toContain('—');
  });

  it('should render a dash when accuracy is null', () => {
    fixture.componentRef.setInput('move', { ...ROCK_SLIDE, accuracy: null });
    fixture.detectChanges();

    const values: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.move-card__value');
    const dashEl: HTMLElement = values[3].querySelector('.move-card__dash')!;

    expect(dashEl).toBeTruthy();
    expect(dashEl.textContent).toContain('—');
  });

  it('should render a dash when effect_chance is null', () => {
    fixture.componentRef.setInput('move', { ...ROCK_SLIDE, effect_chance: null });
    fixture.detectChanges();

    const values: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.move-card__value');
    const dashEl: HTMLElement = values[6].querySelector('.move-card__dash')!;

    expect(dashEl).toBeTruthy();
    expect(dashEl.textContent).toContain('—');
  });
});
