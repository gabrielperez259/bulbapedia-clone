import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContestCard } from './contest-card';
import { ContestType } from '../contest-type/contest-type';
import { ContestCombo } from '../../../models/contest/contest.interface';

describe('ContestCard', () => {
  let component: ContestCard;
  let fixture: ComponentFixture<ContestCard>;

  const mockContestCombo: ContestCombo = {
    normal: {
      use_before: [
        { name: 'double-slap', url: 'https://pokeapi.co/api/v2/move/3/' },
        { name: 'comet-punch', url: 'https://pokeapi.co/api/v2/move/4/' },
      ],
      use_after: [
        { name: 'fire-punch', url: 'https://pokeapi.co/api/v2/move/7/' },
      ],
    },
    super: {
      use_before: [],
      use_after: [],
    },
  };

  const setCardInputs = (
    overrides: Partial<{
      contestCombos: ContestCombo;
      contestTypeName: string;
      contestTypeBerryFlavor: string;
      contestEffect: string;
      contestEffectAppeal: number;
      contestEffectJam: number;
      contestEffectFlavorText: string;
    }> = {},
  ) => {
    fixture.componentRef.setInput(
      'contestCombos',
      overrides.contestCombos !== undefined ? overrides.contestCombos : mockContestCombo,
    );
    fixture.componentRef.setInput(
      'contestTypeName',
      overrides.contestTypeName !== undefined ? overrides.contestTypeName : 'cool',
    );
    fixture.componentRef.setInput(
      'contestTypeBerryFlavor',
      overrides.contestTypeBerryFlavor !== undefined ? overrides.contestTypeBerryFlavor : 'spicy',
    );
    fixture.componentRef.setInput(
      'contestEffect',
      overrides.contestEffect !== undefined
        ? overrides.contestEffect
        : 'Gives a high number of appeal points.',
    );
    fixture.componentRef.setInput(
      'contestEffectAppeal',
      overrides.contestEffectAppeal !== undefined ? overrides.contestEffectAppeal : 4,
    );
    fixture.componentRef.setInput(
      'contestEffectJam',
      overrides.contestEffectJam !== undefined ? overrides.contestEffectJam : 0,
    );
    fixture.componentRef.setInput(
      'contestEffectFlavorText',
      overrides.contestEffectFlavorText !== undefined
        ? overrides.contestEffectFlavorText
        : 'A highly appealing move.',
    );
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ContestCard);
    component = fixture.componentInstance;
    setCardInputs();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering and inputs', () => {
    it('should render header, appeal, jam, and flavor text correctly', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const header = compiled.querySelector('.contest-card-header h2');
      expect(header?.textContent?.trim()).toBe('Contest');

      const stats = compiled.querySelectorAll('.contest-stats .stat');
      expect(stats.length).toBe(2);
      expect(stats[0].textContent).toContain('Appeal:');
      expect(stats[0].textContent).toContain('4');
      expect(stats[1].textContent).toContain('Jam:');
      expect(stats[1].textContent).toContain('0');

      const flavorParagraphs = compiled.querySelectorAll('.contest-flavor p');
      expect(flavorParagraphs.length).toBe(2);
      expect(flavorParagraphs[0].textContent?.trim()).toBe('A highly appealing move.');
      expect(flavorParagraphs[1].textContent?.trim()).toBe('Gives a high number of appeal points.');
    });

    it('should pass contestTypeName and contestTypeBerryFlavor to child ContestType component', () => {
      const childDebugEl = fixture.debugElement.query(By.directive(ContestType));
      expect(childDebugEl).toBeTruthy();

      const childComponent = childDebugEl.componentInstance as ContestType;
      expect(childComponent.contestTypeName()).toBe('cool');
      expect(childComponent.contestTypeBerryFlavor()).toBe('spicy');
    });
  });

  describe('contestConditionColor computed signal', () => {
    it('should compute the correct hex color for standard conditions (case-insensitive)', () => {
      setCardInputs({ contestTypeName: 'cool' });
      expect(component.contestConditionColor()).toBe('#cb1d31');

      setCardInputs({ contestTypeName: 'BEAUTY' });
      expect(component.contestConditionColor()).toBe('#1ccdd3');

      setCardInputs({ contestTypeName: 'Cute' });
      expect(component.contestConditionColor()).toBe('#d61a94');

      setCardInputs({ contestTypeName: 'smart' });
      expect(component.contestConditionColor()).toBe('#1bc841');

      setCardInputs({ contestTypeName: 'tough' });
      expect(component.contestConditionColor()).toBe('#c09018');
    });

    it('should return an empty string for unknown or unmapped contest condition names', () => {
      setCardInputs({ contestTypeName: 'unknown-condition' });
      expect(component.contestConditionColor()).toBe('');

      setCardInputs({ contestTypeName: '' });
      expect(component.contestConditionColor()).toBe('');
    });
  });

  describe('combos rendering and CleanTextPipe', () => {
    it('should render use_before and use_after moves with cleanText applied', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const columns = compiled.querySelectorAll('.combo-column');
      expect(columns.length).toBe(2);

      const beforeValues = columns[0].querySelectorAll('.combo-value');
      expect(beforeValues.length).toBe(2);
      expect(beforeValues[0].textContent?.trim()).toBe('Double Slap');
      expect(beforeValues[1].textContent?.trim()).toBe('Comet Punch');

      const afterValues = columns[1].querySelectorAll('.combo-value');
      expect(afterValues.length).toBe(1);
      expect(afterValues[0].textContent?.trim()).toBe('Fire Punch');
    });

    it('should handle empty or null combo lists gracefully without errors', () => {
      const emptyCombos: ContestCombo = {
        normal: {
          use_before: [],
          use_after: null,
        },
        super: {
          use_before: [],
          use_after: [],
        },
      };

      setCardInputs({ contestCombos: emptyCombos });
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const comboValues = compiled.querySelectorAll('.combo-value');
      expect(comboValues.length).toBe(0);
    });
  });
});
