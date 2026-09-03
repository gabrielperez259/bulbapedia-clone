import { Component, inject, input, signal } from '@angular/core';
import { MovesDataClient } from '../../../services/moves-data-client';
import { RangeDiagramComponent } from "./range-diagram/range-diagram";
import { MOVE_TARGETS } from './models/move-target-info';

@Component({
  selector: 'app-target',
  imports: [RangeDiagramComponent],
  templateUrl: './target.html',
  styleUrl: './target.scss',
})
export class Target {
  public moveDetailsData = inject(MovesDataClient);

  readonly moveTarget = signal(MOVE_TARGETS[this.moveDetailsData.moveTarget()!]);
}
