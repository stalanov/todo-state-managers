import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../reducers';
import { todoKey, TodoState } from '../reducers/todo.reducers';

const todoSelector = createFeatureSelector<AppState, TodoState>(todoKey);

export const list = createSelector(todoSelector, state => state.todoList);

export const loading = createSelector(todoSelector, state => state.loading);

export const saving = createSelector(todoSelector, state => state.saving);
