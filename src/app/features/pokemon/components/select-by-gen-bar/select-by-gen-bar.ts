import { Component, input, output } from '@angular/core';
import { GenValues } from '../../../../shared/utils/gen-values';
import { SelectByGenBarInterface } from './select-by-gen-bar.interface';

@Component({
  selector: 'app-select-by-gen-bar',
  imports: [],
  templateUrl: './select-by-gen-bar.html',
  styleUrl: './select-by-gen-bar.scss',
})
export class SelectByGenBar {
  readonly selectedGeneration = input.required<GenValues>();
  readonly genValue = output<GenValues>();

  public onGenChange(event: Event) {
    this.genValue.emit((event.target as HTMLSelectElement).value as GenValues);
  }

  readonly genOptions: SelectByGenBarInterface[] = [
    { title: 'Gen 1', genValue: GenValues.GenOne },
    { title: 'Gen 2', genValue: GenValues.GenTwo },
    { title: 'Gen 3', genValue: GenValues.GenThree },
    { title: 'Gen 4', genValue: GenValues.GenFour },
    { title: 'Gen 5', genValue: GenValues.GenFive },
    { title: 'Gen 6', genValue: GenValues.GenSix },
    { title: 'Gen 7', genValue: GenValues.GenSeven },
    { title: 'Gen 8', genValue: GenValues.GenEight },
    { title: 'Gen 9', genValue: GenValues.GenNine },
  ];
}
