import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datecustom'
})
export class DatePipePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {
  }
  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return null; // Handle null or undefined input
    }
    
    return this.datePipe.transform(new Date(value), 'dd/MM/yyyy');
  }

}
