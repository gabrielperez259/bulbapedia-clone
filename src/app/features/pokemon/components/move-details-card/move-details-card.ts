import { Component, computed, input } from '@angular/core';
import { MoveDetails } from '../../models/moves/move-details';
import { CleanTextPipe } from '../../../../shared/pipes/clean-text.pipe';
import { ColorTypePipe } from '../../../../shared/pipes/color-type.pipe';

@Component({
  selector: 'app-move-details-card',
  imports: [CleanTextPipe, ColorTypePipe],
  templateUrl: './move-details-card.html',
  styleUrl: './move-details-card.scss',
})
export class MoveDetailsCard {
  move = input.required<MoveDetails | undefined>();

  typeName = computed(() => this.move()?.type.name ?? '');
  typeColor = computed(() => {
    const name = this.typeName();
    return name ? (name.charAt(0).toUpperCase() + name.slice(1)) : '';
  });

  categoryName = computed(() => {
    const name = this.move()?.damage_class.name ?? '';
    return name ? (name.charAt(0).toUpperCase() + name.slice(1)) : '';
  });
}
