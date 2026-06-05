import { G, S } from '@angular/cdk/keycodes';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './grid.scss'
})
export class Grid {
    columns = input.required<number>();
    readonly gap = input<string>('1rem');

}
