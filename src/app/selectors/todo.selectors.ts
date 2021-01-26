import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../reducers';
import { adapter, todoKey, TodoState } from '../reducers/todo.reducers';

const todoSelector = createFeatureSelector<AppState, TodoState>(todoKey);

const { selectAll } = adapter.getSelectors();

export const list = createSelector(todoSelector, selectAll);

export const loading = createSelector(todoSelector, state => state.loading);

export const saving = createSelector(todoSelector, state => state.saving);
