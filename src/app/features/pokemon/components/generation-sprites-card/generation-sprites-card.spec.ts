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

  it('should create', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      sprites: [
        { url: 'https://example.com/front.png', label: 'Front Default' },
        { url: 'https://example.com/back.png', label: 'Back Default' },
      ],
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render title and sprites', () => {
    fixture.componentRef.setInput('group', {
      generationTitle: 'Generation I',
      sprites: [
        { url: 'https://example.com/front.png', label: 'Front Default' },
      ],
    });
    fixture.detectChanges();

    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.generation-title');
    expect(titleEl.textContent).toBe('Generation I');
  });
});
