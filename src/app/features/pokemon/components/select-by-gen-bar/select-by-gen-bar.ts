import { Component, output, signal } from '@angular/core';
import { GenValues } from '../../../../shared/utils/gen-values';
import { SelectByGenBarInterface } from './select-by-gen-bar.interface';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@Component({
  selector: 'app-select-by-gen-bar',
  imports: [MatButtonToggleModule],
  templateUrl: './select-by-gen-bar.html',
  styleUrl: './select-by-gen-bar.scss'
})
export class SelectByGenBar {

  readonly genValue = output<string>();  

  setGenValue(value: string) {
    this.genValue.emit(value);
  }


  readonly genOneIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 1',
    genValue: GenValues.GenOne
  });
  readonly genTwoIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 2',
    genValue: GenValues.GenTwo
  });
  readonly genThreeIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 3',
    genValue: GenValues.GenThree
  });
  readonly genFourIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 4',
    genValue: GenValues.GenFour
  });
  readonly genFiveIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 5',
    genValue: GenValues.GenFive
  });
  readonly genSixIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 6',
    genValue: GenValues.GenSix
  });
  readonly genSevenIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 7',
    genValue: GenValues.GenSeven
  });
  readonly genEightIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 8',
    genValue: GenValues.GenEight
  });
  readonly genNineIoButton = signal<SelectByGenBarInterface>({
    title: 'Gen 9',
    genValue: GenValues.GenNine
  });



}
