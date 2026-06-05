import { Component, effect, model, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  filter = model<string>('');
  filterOutput = output<string>();
  filterEffect = effect(() => this.filterOutput.emit(this.filter()));

}
