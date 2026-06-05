import { Component, input } from '@angular/core';
import { CapitalizeWordsPipe } from '../../../../shared/pipes/capitalize-word.pipe';
import { Pokemon } from '../../models/pokemon';
import { Flex } from '../../../../shared/components/flex/flex';
import { Transparency } from '../../../../shared/directives/transparency';

@Component({
  selector: 'app-ability',
  imports: [CapitalizeWordsPipe, Flex, Transparency],
  templateUrl: './ability.html',
  styleUrl: './ability.scss',
})
export class Ability {
  public abilities = input.required<Pokemon['abilities'] | undefined>();
  public isTransparent = input.required<boolean>();
}
