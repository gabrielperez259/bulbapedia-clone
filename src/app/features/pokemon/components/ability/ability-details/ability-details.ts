import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ability-details',
  imports: [],
  templateUrl: './ability-details.html',
  styleUrl: './ability-details.scss',
})
export class AbilityDetails {

  public name = input<string>('');

}
