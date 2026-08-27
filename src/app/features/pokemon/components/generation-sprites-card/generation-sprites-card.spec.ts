import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerationSpritesCard } from './generation-sprites-card';

describe('GenerationSpritesCard', () => {
  let component: GenerationSpritesCard;
  let fixture: ComponentFixture<GenerationSpritesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationSpritesCard],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerationSpritesCard);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [
        {
          gameName: 'red-blue',
          sprites: [
            { url: 'https://example.com/front.png', label: 'Front Default' },
            { url: 'https://example.com/back.png', label: 'Back Default' },
          ],
        },
      ],
    });
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('should render generation title, game name, and sprites', async () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      games: [
        {
          gameName: 'red-blue',
          sprites: [{ url: 'https://example.com/front.png', label: 'Front Default' }],
        },
      ],
    });
    await fixture.whenStable();

    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.generation-title');
    const gameTitleEl: HTMLElement = fixture.nativeElement.querySelector('.game-title');
    const imgEl: HTMLImageElement = fixture.nativeElement.querySelector('img');
    const labelEl: HTMLElement = fixture.nativeElement.querySelector('.sprite-label');

    expect(titleEl.textContent).toBe('Generation I');
    expect(gameTitleEl.textContent).toContain('Red Blue');
    expect(imgEl.src).toContain('https://example.com/front.png');
    expect(labelEl.textContent).toBe('Front Default');
  });
});
