import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sprite-card',
  standalone: true,
  imports: [],
  templateUrl: './sprite-card.html',
  styleUrl: './sprite-card.scss',
})
export class SpriteCard {
  public imageUrl = input.required<string>();
  public label = input.required<string>();
}
