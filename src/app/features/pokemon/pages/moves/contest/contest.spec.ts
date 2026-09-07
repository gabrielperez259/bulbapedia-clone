import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { Contest } from './contest';
import { MovesDataClient } from '../../../services/moves-data-client';
import { ContestTypeDataClient } from '../../../services/contest-type-data-client';
import { ContestEffectDataClient } from '../../../services/contest-effect-data-client';
import { SuperContestEffectDataClient } from '../../../services/super-contest-effect-data-client';
import { ContestCard } from '../../../components/contest/contest-card/contest-card';
import { SuperContestCard } from '../../../components/contest/super-contest-card/super-contest-card';
import { ContestCombo } from '../../../models/contest/contest.interface';

class MockMovesDataClient {
  moveDetailsLoading = signal(false);
  moveDetailsError = signal<unknown>(null);
  moveContestEffectUrl = signal<string | undefined>(undefined);
  moveSuperContestEffectUrl = signal<string | undefined>(undefined);
  moveContestTypeUrl = signal<string | undefined>(undefined);
  moveContestCombos = signal<ContestCombo | undefined>(undefined);
}

class MockContestTypeDataClient {
  url = signal('');
  contestTypeLoading = signal(false);
  contestTypeError = signal<unknown>(null);
  contestTypeName = signal<string | undefined>('cool');
  contestTypeBerryFlavor = signal<string | undefined>('spicy');
}

class MockContestEffectDataClient {
  url = signal('');
  contestEffectLoading = signal(false);
  contestEffectError = signal<unknown>(null);
  contestEffectName = signal<string | undefined>('Gives a high number of appeal points.');
  contestEffectAppeal = signal<number | undefined>(4);
  contestEffectJam = signal<number | undefined>(0);
  contestEffectFlavorText = signal<string | undefined>('A highly appealing move.');
}

class MockSuperContestEffectDataClient {
  url = signal('');
  superContestEffectLoading = signal(false);
  superContestEffectError = signal<unknown>(null);
  superContestEffectAppeal = signal<number | undefined>(2);
  superContestEffectFlavorText = signal<string | undefined>('Enables a user to perform well.');
}

describe('Contest', () => {
  let component: Contest;
  let fixture: ComponentFixture<Contest>;
  let mockMoves: MockMovesDataClient;
  let mockContestType: MockContestTypeDataClient;
  let mockContestEffect: MockContestEffectDataClient;
  let mockSuperContest: MockSuperContestEffectDataClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contest],
      providers: [
        { provide: MovesDataClient, useClass: MockMovesDataClient },
        { provide: ContestTypeDataClient, useClass: MockContestTypeDataClient },
        { provide: ContestEffectDataClient, useClass: MockContestEffectDataClient },
        { provide: SuperContestEffectDataClient, useClass: MockSuperContestEffectDataClient },
      ],
    }).compileComponents();

    mockMoves = TestBed.inject(MovesDataClient) as unknown as MockMovesDataClient;
    mockContestType = TestBed.inject(ContestTypeDataClient) as unknown as MockContestTypeDataClient;
    mockContestEffect = TestBed.inject(ContestEffectDataClient) as unknown as MockContestEffectDataClient;
    mockSuperContest = TestBed.inject(SuperContestEffectDataClient) as unknown as MockSuperContestEffectDataClient;

    fixture = TestBed.createComponent(Contest);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('global loading and error states for move details', () => {
    it('should display "Loading..." when move details are loading', () => {
      mockMoves.moveDetailsLoading.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const loadingEl = compiled.querySelector('.contest-state');
      expect(loadingEl).toBeTruthy();
      expect(loadingEl?.textContent).toContain('Loading...');
      expect(compiled.querySelector('.contest-cards')).toBeNull();
    });

    it('should display "Unable to load move information." when move details has an error', () => {
      mockMoves.moveDetailsError.set(new Error('Failed to load'));
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorEl = compiled.querySelector('.contest-state-error');
      expect(errorEl).toBeTruthy();
      expect(errorEl?.textContent).toContain('Unable to load move information.');
      expect(compiled.querySelector('.contest-cards')).toBeNull();
    });
  });

  describe('empty state (no contest data available)', () => {
    it('should display empty state message when move has neither contest nor super contest info', () => {
      mockMoves.moveDetailsLoading.set(false);
      mockMoves.moveDetailsError.set(null);
      mockMoves.moveContestEffectUrl.set(undefined);
      mockMoves.moveSuperContestEffectUrl.set(undefined);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyEl = compiled.querySelector('.contest-state-empty');
      expect(emptyEl).toBeTruthy();
      expect(emptyEl?.querySelector('h3')?.textContent).toContain('No Contest Information');
      expect(emptyEl?.querySelector('p')?.textContent).toContain(
        'This move does not have Contest or Super Contest information.',
      );
      expect(compiled.querySelector('.contest-cards')).toBeNull();
    });
  });

  describe('conditional rendering of contest sections', () => {
    it('should render only Contest section when only moveContestEffectUrl is present', () => {
      mockMoves.moveContestEffectUrl.set('https://pokeapi.co/api/v2/contest-effect/1/');
      mockMoves.moveSuperContestEffectUrl.set(undefined);
      fixture.detectChanges();

      const contestCardEl = fixture.debugElement.query(By.directive(ContestCard));
      const superContestCardEl = fixture.debugElement.query(By.directive(SuperContestCard));

      expect(contestCardEl).toBeTruthy();
      expect(superContestCardEl).toBeNull();
    });

    it('should render only Super Contest section when only moveSuperContestEffectUrl is present', () => {
      mockMoves.moveContestEffectUrl.set(undefined);
      mockMoves.moveSuperContestEffectUrl.set(
        'https://pokeapi.co/api/v2/super-contest-effect/1/',
      );
      fixture.detectChanges();

      const contestCardEl = fixture.debugElement.query(By.directive(ContestCard));
      const superContestCardEl = fixture.debugElement.query(By.directive(SuperContestCard));

      expect(contestCardEl).toBeNull();
      expect(superContestCardEl).toBeTruthy();
    });

    it('should render both Contest and Super Contest sections when both URLs are present', () => {
      mockMoves.moveContestEffectUrl.set('https://pokeapi.co/api/v2/contest-effect/1/');
      mockMoves.moveSuperContestEffectUrl.set(
        'https://pokeapi.co/api/v2/super-contest-effect/1/',
      );
      fixture.detectChanges();

      const contestCardEl = fixture.debugElement.query(By.directive(ContestCard));
      const superContestCardEl = fixture.debugElement.query(By.directive(SuperContestCard));

      expect(contestCardEl).toBeTruthy();
      expect(superContestCardEl).toBeTruthy();
    });
  });

  describe('Contest section loading and error states', () => {
    beforeEach(() => {
      mockMoves.moveContestEffectUrl.set('https://pokeapi.co/api/v2/contest-effect/1/');
    });

    it('should show "Loading Contest information..." when contestTypeLoading is true', () => {
      mockContestType.contestTypeLoading.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Loading Contest information...');
      expect(fixture.debugElement.query(By.directive(ContestCard))).toBeNull();
    });

    it('should show "Loading Contest information..." when contestEffectLoading is true', () => {
      mockContestEffect.contestEffectLoading.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Loading Contest information...');
      expect(fixture.debugElement.query(By.directive(ContestCard))).toBeNull();
    });

    it('should show "Unable to load Contest information." when contestTypeError is true', () => {
      mockContestType.contestTypeError.set('Failed to fetch contest type');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Unable to load Contest information.');
      expect(fixture.debugElement.query(By.directive(ContestCard))).toBeNull();
    });

    it('should show "Unable to load Contest information." when contestEffectError is true', () => {
      mockContestEffect.contestEffectError.set('Failed to fetch contest effect');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Unable to load Contest information.');
      expect(fixture.debugElement.query(By.directive(ContestCard))).toBeNull();
    });
  });

  describe('Super Contest section loading and error states', () => {
    beforeEach(() => {
      mockMoves.moveSuperContestEffectUrl.set(
        'https://pokeapi.co/api/v2/super-contest-effect/1/',
      );
    });

    it('should show "Loading Super Contest information..." when superContestLoading is true', () => {
      mockSuperContest.superContestEffectLoading.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Loading Super Contest information...');
      expect(fixture.debugElement.query(By.directive(SuperContestCard))).toBeNull();
    });

    it('should show "Unable to load Super Contest information." when superContestErrorState is true', () => {
      mockSuperContest.superContestEffectError.set('Failed to fetch super contest');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Unable to load Super Contest information.');
      expect(fixture.debugElement.query(By.directive(SuperContestCard))).toBeNull();
    });
  });

  describe('reactive effects and URL propagation', () => {
    it('should synchronize service URLs and combos from movesDataClient', () => {
      const typeUrl = 'https://pokeapi.co/api/v2/contest-type/1/';
      const effectUrl = 'https://pokeapi.co/api/v2/contest-effect/1/';
      const superUrl = 'https://pokeapi.co/api/v2/super-contest-effect/1/';
      const customCombos: ContestCombo = {
        normal: {
          use_before: [{ name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/' }],
          use_after: [],
        },
        super: { use_before: [], use_after: [] },
      };

      mockMoves.moveContestTypeUrl.set(typeUrl);
      mockMoves.moveContestEffectUrl.set(effectUrl);
      mockMoves.moveSuperContestEffectUrl.set(superUrl);
      mockMoves.moveContestCombos.set(customCombos);
      fixture.detectChanges();

      expect(mockContestType.url()).toBe(typeUrl);
      expect(mockContestEffect.url()).toBe(effectUrl);
      expect(mockSuperContest.url()).toBe(superUrl);
      expect(component.contestCombos()).toEqual(customCombos);
    });
  });
});
