import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Transparency } from '../../../../shared/directives/transparency';
import { CleanTextPipe } from "../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-name',
  imports: [ RouterLink, Transparency, CleanTextPipe],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class Name {
  public pokemonName = input.required<string>();
  public route = input<string>();
  public isTransparent = input.required<boolean>();
}
