import { Component, input, output } from "@angular/core";

@Component({
  selector: 'app-io-button',
  imports: [],
  templateUrl: './io-button.html',
  styleUrl: './io-button.scss'
})
export class IoButton {
    buttonText = input.required<string>();
    inputValue = input.required<string>();
    outputValue = output<string>();


}
