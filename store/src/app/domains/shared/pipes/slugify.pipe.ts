import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
  standalone: true
})
export class SlugifyPipe implements PipeTransform {

  transform(value: string): string {
    return value.trim()
      .replace(/\s+/g, '-')
      .replace(/ñ/g, 'n')
      .replace(/[()]/g, '')
      .replace("'", '')
      .replace(/-+/g, '-')
      .toLowerCase();
  }
}
