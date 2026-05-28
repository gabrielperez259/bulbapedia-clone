import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanText',
  standalone: true
})
export class CleanTextPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    return value
      .split('-') // 1. Separa o texto onde tem hífen (gera um array de palavras)
      .map(word => {
        if (!word) return '';
        // 2. Para cada palavra, deixa a primeira letra Maiúscula e o resto Minúscula
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' '); // 3. Junta as palavras novamente colocando um espaço entre elas
  }

}