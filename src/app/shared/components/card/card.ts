import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Transparency } from '../../directives/transparency';

@Component({
  selector: 'app-card',
  imports: [Transparency],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.scss',
})
export class Card {
  isTransparent = input.required<boolean>();
}
