import { Component, input, output, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'app-io-button',
  imports: [],
  templateUrl: './io-button.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './io-button.scss'
})
export class IoButton {
    buttonText = input.required<string>();
    inputValue = input.required<string>();
    outputValue = output<string>();


}
