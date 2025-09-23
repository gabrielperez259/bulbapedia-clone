import { Pipe, PipeTransform } from '@angular/core';
import { ColorTypes } from '../../features/pokemon/models/types/color-types';


@Pipe({
  name: 'colorType',
  standalone: true 
})
export class ColorTypePipe implements PipeTransform {
  transform(type: string): string {
    if (type in ColorTypes) {
      return ColorTypes[type as keyof typeof ColorTypes];      
    } else {
      return ''; 
    }
  }
}