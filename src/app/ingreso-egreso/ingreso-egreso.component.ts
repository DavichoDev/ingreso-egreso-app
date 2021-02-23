import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import * as uiActions from '../shared/ui.actions';
import { isLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  tipo: string = 'Ingreso';
  loading: boolean = false;
  ingresoForm: FormGroup;

  uiSubscription: Subscription;

  constructor( 
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.construirForm();

    this.uiSubscription = this.store.select('ui')
      .subscribe( ({ loading }) => this.loading = loading );

  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  construirForm() {
    this.ingresoForm = this.fb.group({
      descripcion: [ '', Validators.required ],
      monto: [ '', Validators.required ],
    });
  }

  guardar() {
    if ( this.ingresoForm.invalid ) { return; }

    this.store.dispatch( uiActions.isLoading() );

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.ingresoForm.reset();
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch( err => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Error', err.message , 'error');
      } );

  }

}
