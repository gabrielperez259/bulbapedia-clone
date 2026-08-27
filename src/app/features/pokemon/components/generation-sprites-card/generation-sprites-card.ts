import { Component, computed, input } from '@angular/core';
import { SpriteCard } from '../sprite-card/sprite-card';
import { CleanTextPipe } from '../../../../shared/pipes/clean-text.pipe';

export interface SpriteGroupItem {
  url: string;
  label: string;
}

export interface GameSpriteGroup {
  gameName: string;
  sprites: SpriteGroupItem[];
}

export interface GenerationSpriteGroup {
  generationTitle: string;
  games: GameSpriteGroup[];
}

@Component({
  selector: 'app-generation-sprites-card',
  standalone: true,
  imports: [SpriteCard, CleanTextPipe],
  templateUrl: './generation-sprites-card.html',
  styleUrl: './generation-sprites-card.scss',
})
export class GenerationSpritesCard {
  public group = input.required<GenerationSpriteGroup>();

  public headingId = computed(() => this.toId(this.group().generationTitle));

  public gameHeadingId(gameName: string): string {
    return `${this.headingId()}-${this.toId(gameName)}`;
  }

  private toId(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
