import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { TodoState, todoReducer, todoKey } from './todo.reducers';

export interface AppState {
  [todoKey]: TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  [todoKey]: todoReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
