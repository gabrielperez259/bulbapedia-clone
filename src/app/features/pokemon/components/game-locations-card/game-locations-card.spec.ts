import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameLocationsCard } from './game-locations-card';

describe('GameLocationsCard', () => {
  let component: GameLocationsCard;
  let fixture: ComponentFixture<GameLocationsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameLocationsCard],
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
    expect(badgeEl.textContent).toContain('Red');
  });
});
