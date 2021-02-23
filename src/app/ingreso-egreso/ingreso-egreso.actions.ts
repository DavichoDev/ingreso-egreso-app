import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const UnsetItems = createAction('[IngresoEgreso] Unset Items');

export const setItems = createAction(
    '[IngresoEgreso] Set Items',
    props<{ items: IngresoEgreso[] }>()
    );
