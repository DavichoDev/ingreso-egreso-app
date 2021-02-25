import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[];
  ingresosSubs: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  ngOnDestroy() {
    this.ingresosSubs.unsubscribe();
  }

  borrar( uid ){
    this.ingresoEgresoService.borrarIngresoEgreso( uid )
      .then( () => Swal.fire( 'Borrado', 'Item borrado exitosamente', 'success' ) )
      .catch( ( error ) => Swal.fire( 'Error', error.message , 'error' ) );
  }

}
