import { Component, input } from '@angular/core';
import { CleanTextPipe } from '../../../../shared/pipes/clean-text.pipe';

export interface GameLocationRow {
  gameName: string;
  locations: string[];
}

export interface GenerationLocationsGroup {
  generationTitle: string;
  games: GameLocationRow[];
}

@Component({
  selector: 'app-game-locations-card',
  standalone: true,
  imports: [CleanTextPipe],
  templateUrl: './game-locations-card.html',
  styleUrl: './game-locations-card.scss',
})
export class GameLocationsCard {
  public group = input.required<GenerationLocationsGroup>();
}
