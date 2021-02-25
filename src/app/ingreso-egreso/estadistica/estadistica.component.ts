import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  // Doughnut
  public doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  // Finanzas
  ingresos: number = 0;
  egresos: number = 0;
  TotalEgresos: number = 0;
  TotalIngresos: number = 0;

  itemsSubs: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>
  ) { }

  ngOnInit(): void {
    this.itemsSubs = this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => this.generarEstadisticas( items ) );
  }

  ngOnDestroy(){
    this.itemsSubs.unsubscribe();
  }

  generarEstadisticas( items: IngresoEgreso[] ){
    items.forEach( item  => {
      if ( item.tipo === 'Ingreso' ) {
        this.TotalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.TotalEgresos += item.monto;
        this.egresos ++;
      }
    });

    this.doughnutChartData = [[ this.TotalEgresos, this.TotalIngresos ]];

  }

}
