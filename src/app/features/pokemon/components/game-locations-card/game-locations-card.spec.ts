import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GameLocationsCard } from './game-locations-card';
import { GAME_VERSION_COLORS } from '../../../../shared/constants/game-version-colors';

describe('GameLocationsCard', () => {
  let component: GameLocationsCard;
  let fixture: ComponentFixture<GameLocationsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameLocationsCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GameLocationsCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [
        { gameName: 'red', locations: ['pallet-town-area', 'route-1'] },
      ],
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render generation title and game name', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [
        { gameName: 'red', locations: ['pallet-town-area'] },
      ],
    });
    fixture.detectChanges();

    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.generation-title');
    const badgeEl: HTMLElement = fixture.nativeElement.querySelector('.game-badge');

    expect(titleEl.textContent).toBe('Generation I');
    expect(badgeEl.textContent?.trim()).toContain('Red');
  });

  it('should apply game color from GAME_VERSION_COLORS to game badge', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [
        { gameName: 'red', locations: [] },
      ],
    });
    fixture.detectChanges();

    // getGameColor() must return the hex value from the map
    const expectedColor = GAME_VERSION_COLORS['red'];
    expect(component.getGameColor('red')).toBe(expectedColor);

    // The badge element must have a non-empty background style set by Angular binding
    const badgeEl = fixture.nativeElement.querySelector('.game-badge') as HTMLAnchorElement;
    expect(badgeEl.style.background).toBeTruthy();
  });

  it('should render location items as links', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [
        { gameName: 'red', locations: ['pallet-town-area', 'route-1'] },
      ],
    });
    fixture.detectChanges();

    const locationLinks = fixture.nativeElement.querySelectorAll('.location-link');
    expect(locationLinks.length).toBe(2);
    expect(locationLinks[0].tagName.toLowerCase()).toBe('a');
  });

  it('should show "no location" message when locations array is empty', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [
        { gameName: 'blue', locations: [] },
      ],
    });
    fixture.detectChanges();

    const noLocationEl: HTMLElement = fixture.nativeElement.querySelector('.no-location');
    expect(noLocationEl).toBeTruthy();
    expect(noLocationEl.textContent).toContain('Não encontrado neste jogo');
  });

  it('getGameColor() should return fallback color for unknown game', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [{ gameName: 'red', locations: [] }],
    });
    fixture.detectChanges();

    const color = component.getGameColor('unknown-game');
    expect(color).toBe('#6366f1');
  });
});
