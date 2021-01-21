import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { TodoState, todoReducer } from './todo.reducers';

export interface AppState {
  todo: TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
