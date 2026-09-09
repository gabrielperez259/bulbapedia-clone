import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CleanTextPipe } from '../../../../shared/pipes/clean-text.pipe';
import { getGameVersionColor } from '../../../../shared/constants/game-version-colors';

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
  imports: [CleanTextPipe, RouterLink],
  templateUrl: './game-locations-card.html',
  styleUrl: './game-locations-card.scss',
})
export class GameLocationsCard {
  public group = input.required<GenerationLocationsGroup>();

  public getGameColor(gameName: string): string {
    return getGameVersionColor(gameName);
  }
}
