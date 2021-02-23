import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

import { AppState } from '../app.reducer';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosEgresosSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe( filter( ( auth ) => auth.user != null ) )
    .subscribe( ({user}) => {
      this.ingresosEgresosSubs = this.ingresoEgresoService.initIngresosEgresosListener( user.uid )
        .subscribe( ( ingresosEgresos ) =>
          this.store.dispatch( ingresosEgresosActions
            .setItems( { items: ingresosEgresos} ) )
        );
    });
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
    this.ingresosEgresosSubs.unsubscribe();
  }

}
