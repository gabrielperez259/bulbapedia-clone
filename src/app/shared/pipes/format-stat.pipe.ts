import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStat',
  standalone: true
})
export class FormatStatPipe implements PipeTransform {

  transform(value: any): string {
    // 1. Verifica se o valor é nulo, indefinido ou uma string vazia
    if (value === null || value === undefined || value === '') {
      return '—';
    }

    // 2. Tenta converter o valor para número e verifica se ele é válido
    const parsedNumber = Number(value);
    
    if (!isNaN(parsedNumber)) {
      return `${parsedNumber}%`;
    }

    // 3. Caso o valor não seja um número (ex: uma string de texto), retorna o próprio valor
    return String(value);
  }

}