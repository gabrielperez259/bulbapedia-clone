import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpriteCard } from './sprite-card';

describe('SpriteCard', () => {
  let component: SpriteCard;
  let fixture: ComponentFixture<SpriteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpriteCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SpriteCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('imageUrl', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
    fixture.componentRef.setInput('label', 'Front Default');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render image url and label correctly', () => {
    const testUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
    const testLabel = 'Front Default';

    fixture.componentRef.setInput('imageUrl', testUrl);
    fixture.componentRef.setInput('label', testLabel);
    fixture.detectChanges();

    const imgEl: HTMLImageElement = fixture.nativeElement.querySelector('img');
    const labelEl: HTMLElement = fixture.nativeElement.querySelector('.sprite-label');

    expect(imgEl.src).toContain(testUrl);
    expect(labelEl.textContent).toBe(testLabel);
  });
});
