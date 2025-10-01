import { Component, input } from '@angular/core';
import { Transparency } from "../../directives/transparency";

@Component({
  selector: 'app-card',
  imports: [Transparency],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

  isTransparent = input.required<boolean>();

}
