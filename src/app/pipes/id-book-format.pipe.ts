import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idBookFormat'
})
export class IdBookFormatPipe implements PipeTransform {

transform(value: number): string {
    let ref: string;
    ref = `Ref-${value}`
    return ref;
  }

}
