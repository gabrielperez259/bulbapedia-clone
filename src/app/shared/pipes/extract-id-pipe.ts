import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractId',
  standalone: true,
})
export class ExtractIdPipe implements PipeTransform {
  transform(url: string): number | null {
    if (!url) return null;

    const match = url.match(/\/(\d+)\/$/); // pega o último número antes da /
    return match ? Number(match[1]) : null;
  }
}
