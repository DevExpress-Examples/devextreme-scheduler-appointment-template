import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'apply', standalone: false })
export class ApplyPipe<TArgs, TReturn> implements PipeTransform {
  transform(func: ((...args: TArgs[]) => TReturn), ...args: TArgs[]): TReturn { return func(...args); }
}
