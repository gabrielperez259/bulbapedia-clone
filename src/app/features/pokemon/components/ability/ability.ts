import { Component, computed, input } from '@angular/core';
import { Pokemon } from '../../models/pokemon/pokemon';
import { CapitalizeWordsPipe } from "../../../../shared/pipes/capitalize-word.pipe";



@Component({
  selector: 'app-ability',
  imports: [CapitalizeWordsPipe],
  templateUrl: './ability.html',
  styleUrl: './ability.scss'
})
export class Ability {

  abilities = input.required<Pokemon["abilities"] | undefined>()

  abilityClass = computed(() =>{ 
    let len = this.abilities()!.length;    
    if (len === 1) return 'single-ability-button';
    if (len === 2) return 'double-ability-button';
    if (len === 3) return 'triple-ability-button';
    else return null;

  })



}
