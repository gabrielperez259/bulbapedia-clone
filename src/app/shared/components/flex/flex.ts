import { Component, input } from '@angular/core';

@Component({
  selector: 'app-flex',
  imports: [],
  templateUrl: './flex.html',
  styleUrl: './flex.scss',
})
export class Flex {
  display = input('flex');
  gap = input('10px');
}
