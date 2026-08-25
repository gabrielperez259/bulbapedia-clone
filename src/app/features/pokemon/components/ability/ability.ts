import { Component, input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { Transparency } from '../../../../shared/directives/transparency';
import { RouterLink } from '@angular/router';
import { CleanTextPipe } from "../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-ability',
  imports: [Transparency, RouterLink, CleanTextPipe],
  templateUrl: './ability.html',
  styleUrl: './ability.scss',
})
export class Ability {
  public abilities = input.required<Pokemon['abilities'] | undefined>();
  public isTransparent = input.required<boolean>();
}
