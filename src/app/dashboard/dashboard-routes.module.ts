import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const RUTAS_HIJAS: Routes = [
  {
      path: '',
      component: DashboardComponent,
      children: dashboardRoutes,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( RUTAS_HIJAS )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
