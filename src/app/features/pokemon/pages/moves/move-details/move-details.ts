import { Component, effect, inject, input } from '@angular/core';
import { MovesDataClient } from '../../../services/moves-data-client';
import { MovesSideBar } from "../moves-side-bar/moves-side-bar";
import { RouterOutlet } from "@angular/router";
import { MoveDetailsCard } from "../../../components/move-details-card/move-details-card";

@Component({
  selector: 'app-move-details',
  imports: [MovesSideBar, RouterOutlet, MoveDetailsCard],
  templateUrl: './move-details.html',
  styleUrl: './move-details.scss',
})
export class MoveDetailsComponent {

  name = input.required<string>();

  movesDataDetails = inject(MovesDataClient);
  
  moveDetailsEffect = effect(() => {
    this.movesDataDetails.search.set(this.name());
  })
  
}
