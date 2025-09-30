import { G, S } from '@angular/cdk/keycodes';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.scss'
})
export class Grid {
    columns = input.required<number>();
    readonly gap = input<string>('1rem');

}
