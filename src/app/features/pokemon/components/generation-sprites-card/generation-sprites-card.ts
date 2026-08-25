import { Component, input } from '@angular/core';
import { SpriteCard } from '../sprite-card/sprite-card';

export interface SpriteGroupItem {
  url: string;
  label: string;
}

export interface GenerationSpriteGroup {
  generationTitle: string;
  sprites: SpriteGroupItem[];
}

@Component({
  selector: 'app-generation-sprites-card',
  standalone: true,
  imports: [SpriteCard],
  templateUrl: './generation-sprites-card.html',
  styleUrl: './generation-sprites-card.scss',
})
export class GenerationSpritesCard {
  public group = input.required<GenerationSpriteGroup>();
}
