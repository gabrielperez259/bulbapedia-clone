import { Component, computed, input } from '@angular/core';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";
import { Pokemon } from '../../models/pokemon';
import { Flex } from "../../../../shared/components/flex/flex";
import { Transparency } from "../../../../shared/directives/transparency";



@Component({
  selector: 'app-ability',
  imports: [CapitalizeWordsPipe, Flex, Transparency],
  templateUrl: './ability.html',
  styleUrl: './ability.scss'
})
export class Ability {

  abilities = input.required<Pokemon["abilities"] | undefined>()
  isTransparent = input.required<boolean>()

  abilityClass = computed(() =>{ 
    let len = this.abilities()!.length;    
    if (len === 1) return 'single-ability-button';
    if (len === 2) return 'double-ability-button';
    if (len === 3) return 'triple-ability-button';
    else return null;

  })



}
