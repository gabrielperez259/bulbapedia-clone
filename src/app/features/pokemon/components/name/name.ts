import { Component, input } from '@angular/core';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { RouterLink } from '@angular/router';
import { Transparency } from '../../../../shared/directives/transparency';

@Component({
  selector: 'app-name',
  imports: [CapitalizeWordsPipe, RouterLink, Transparency],
  templateUrl: './name.html',
  styleUrl: './name.scss'
})
export class Name {

  public pokemonName = input.required<string>()
  public route = input<string>()
  public isTransparent = input.required<boolean>()
  
}
