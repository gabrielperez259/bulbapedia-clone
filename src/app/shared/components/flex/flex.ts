import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-flex',
  imports: [],
  templateUrl: './flex.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './flex.scss'
})
export class Flex {

  display = input('flex');
  gap = input('10px');

}
