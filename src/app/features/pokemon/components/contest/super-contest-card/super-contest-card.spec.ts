import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuperContestCard } from './super-contest-card';
import { ContestType } from '../contest-type/contest-type';
import { ContestCombo } from '../../../models/contest/contest.interface';

describe('SuperContestCard', () => {
  let component: SuperContestCard;
  let fixture: ComponentFixture<SuperContestCard>;

  const mockContestCombo: ContestCombo = {
    normal: {
      use_before: [],
      use_after: [],
    },
    super: {
      use_before: [
        { name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/' },
        { name: 'karate-chop', url: 'https://pokeapi.co/api/v2/move/2/' },
      ],
      use_after: [
        { name: 'mega-punch', url: 'https://pokeapi.co/api/v2/move/5/' },
      ],
    },
  };

  const setCardInputs = (
    overrides: Partial<{
      contestCombos: ContestCombo;
      contestTypeName: string;
      contestTypeBerryFlavor: string;
      superContestEffectFlavorText: string;
      superContestAppeal: number;
    }> = {},
  ) => {
    fixture.componentRef.setInput(
      'contestCombos',
      overrides.contestCombos !== undefined ? overrides.contestCombos : mockContestCombo,
    );
    fixture.componentRef.setInput(
      'contestTypeName',
      overrides.contestTypeName !== undefined ? overrides.contestTypeName : 'beauty',
    );
    fixture.componentRef.setInput(
      'contestTypeBerryFlavor',
      overrides.contestTypeBerryFlavor !== undefined ? overrides.contestTypeBerryFlavor : 'dry',
    );
    fixture.componentRef.setInput(
      'superContestEffectFlavorText',
      overrides.superContestEffectFlavorText !== undefined
        ? overrides.superContestEffectFlavorText
        : 'Enables a user to perform well in Super Contests.',
    );
    fixture.componentRef.setInput(
      'superContestAppeal',
      overrides.superContestAppeal !== undefined ? overrides.superContestAppeal : 2,
    );
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperContestCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperContestCard);
    component = fixture.componentInstance;
    setCardInputs();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering and inputs', () => {
    it('should render header, appeal value, and effect flavor text', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const headerLabel = compiled.querySelector('.super-contest-card-header .contest-label');
      expect(headerLabel?.textContent?.trim()).toBe('Super Contest');

      const flavorText = compiled.querySelector('.effect-content p');
      expect(flavorText?.textContent?.trim()).toBe(
        'Enables a user to perform well in Super Contests.',
      );

      const appealLabel = compiled.querySelector('.appeal-container .appeal-label');
      expect(appealLabel?.textContent?.trim()).toBe('Appeal');

      const appealValue = compiled.querySelector('.appeal-container .appeal-value');
      expect(appealValue?.textContent?.trim()).toBe('2');
    });

    it('should pass contestTypeName and contestTypeBerryFlavor to child ContestType component', () => {
      const childDebugEl = fixture.debugElement.query(By.directive(ContestType));
      expect(childDebugEl).toBeTruthy();

      const childComponent = childDebugEl.componentInstance as ContestType;
      expect(childComponent.contestTypeName()).toBe('beauty');
      expect(childComponent.contestTypeBerryFlavor()).toBe('dry');
    });
  });

  describe('combos conditional rendering and null handling', () => {
    it('should render move names when use_before and use_after are provided', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const groups = compiled.querySelectorAll('.combo-group');
      expect(groups.length).toBe(2);

      const beforeGroup = groups[0];
      const beforeMoves = beforeGroup.querySelectorAll('.combo-move .move-name');
      expect(beforeMoves.length).toBe(2);
      expect(beforeMoves[0].textContent?.trim()).toBe('pound');
      expect(beforeMoves[1].textContent?.trim()).toBe('karate-chop');
      expect(beforeGroup.querySelector('.no-combos')).toBeNull();

      const afterGroup = groups[1];
      const afterMoves = afterGroup.querySelectorAll('.combo-move .move-name');
      expect(afterMoves.length).toBe(1);
      expect(afterMoves[0].textContent?.trim()).toBe('mega-punch');
      expect(afterGroup.querySelector('.no-combos')).toBeNull();
    });

    it('should render fallback message when use_before is null', () => {
      const combosWithNullBefore: ContestCombo = {
        normal: { use_before: [], use_after: [] },
        super: {
          use_before: null,
          use_after: [{ name: 'mega-punch', url: 'https://pokeapi.co/api/v2/move/5/' }],
        },
      };

      setCardInputs({ contestCombos: combosWithNullBefore });
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const groups = compiled.querySelectorAll('.combo-group');

      const beforeGroup = groups[0];
      const fallback = beforeGroup.querySelector('.no-combos');
      expect(fallback).toBeTruthy();
      expect(fallback?.textContent?.trim()).toBe('No compatible moves.');
      expect(beforeGroup.querySelectorAll('.combo-move').length).toBe(0);
    });

    it('should render fallback message when use_after is null', () => {
      const combosWithNullAfter: ContestCombo = {
        normal: { use_before: [], use_after: [] },
        super: {
          use_before: [{ name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/' }],
          use_after: null,
        },
      };

      setCardInputs({ contestCombos: combosWithNullAfter });
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const groups = compiled.querySelectorAll('.combo-group');

      const afterGroup = groups[1];
      const fallback = afterGroup.querySelector('.no-combos');
      expect(fallback).toBeTruthy();
      expect(fallback?.textContent?.trim()).toBe('No compatible moves.');
      expect(afterGroup.querySelectorAll('.combo-move').length).toBe(0);
    });
  });
});
