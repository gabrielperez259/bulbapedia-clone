import {Component, computed, input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-sprite',
  imports: [],
  standalone: true,
  templateUrl: './sprite.html',
  styleUrl: './sprite.scss'
})
export class Sprite {


  id = input.required({ transform: numberAttribute });
  width = input.required();
  background = input.required();


  url = computed(() =>{    
    
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id()}.png`
  })



}
