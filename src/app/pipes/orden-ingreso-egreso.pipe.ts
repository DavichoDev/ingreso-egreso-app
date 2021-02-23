import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform( items: IngresoEgreso[] ): IngresoEgreso[] {
    return items.slice().sort( (a) => {

      if ( a.tipo === 'Ingreso' ) {
        return -1;
      } else {
        return 1;
      }

    });
  }

}
