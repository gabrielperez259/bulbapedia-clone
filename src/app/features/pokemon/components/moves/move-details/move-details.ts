import { Component, effect, inject, input, OnInit } from '@angular/core';
import { MovesDataClient } from '../../../services/moves-data-client';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Flex } from "../../../../../shared/components/flex/flex";
import { Grid } from "../../../../../shared/components/grid/grid";
import { CapitalizeWordsPipe } from "../../../../../shared/pipes/capitalize-word.pipe";

@Component({
  selector: 'app-move-details',
  imports: [
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    Flex,
    Grid,
    CapitalizeWordsPipe
],
  templateUrl: './move-details.html',
  styleUrl: './move-details.scss',
  providers: [MovesDataClient]
})
export class MoveDetails  {
  moveName = input.required<string>()  
  learnedAtLevel = input.required<number>()
  movesDataClient = inject(MovesDataClient);
  
  moveNameEffect = effect(() => {    
    this.movesDataClient.search.set(this.moveName());
  
  })  

}
