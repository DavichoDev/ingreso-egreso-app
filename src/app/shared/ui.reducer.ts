import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    loading: boolean;
}

export const initialState: State = {
   loading: false,
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, loading: true})),
    on(stopLoading, state => ({ ...state, loading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}
