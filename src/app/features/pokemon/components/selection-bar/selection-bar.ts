import { Component, effect, input, model, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CleanTextPipe } from '../../../../shared/pipes/clean-text.pipe';

@Component({
  selector: 'app-selection-bar',
  imports: [FormsModule],
  templateUrl: './selection-bar.html',
  styleUrl: './selection-bar.scss',
})
export class SelectionBar {
  labelText = input<string>('');
  initialValue = input<string>('');
  values = input<string[]>([]);
  selectedOption = model<string>(this.initialValue());
  selectedOptionOutput = output<string>();
  route = input<string>('');

  initialValueEffect = effect(() => this.selectedOption.set(this.initialValue()));

  selectOptionEffect = effect(() => this.selectedOptionOutput.emit(this.selectedOption()));
  
}
