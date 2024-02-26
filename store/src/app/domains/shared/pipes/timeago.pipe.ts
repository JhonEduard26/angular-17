import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns'

@Pipe({
  name: 'timeago',
  standalone: true
})
export class TimeagoPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return formatDistanceToNow(date, { addSuffix: true });
  }

}
