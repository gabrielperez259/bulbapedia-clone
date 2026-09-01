import { Component, input } from '@angular/core';

@Component({
  selector: 'app-move-details',
  imports: [],
  templateUrl: './move-details.html',
  styleUrl: './move-details.scss',
})
export class MoveDetails {

  name = input.required<string>();
  
}
