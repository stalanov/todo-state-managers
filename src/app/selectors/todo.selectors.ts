import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';

const todoSelector = (state: AppState) => state.todo;

export const list = createSelector(todoSelector, state => state.todoList);

export const loading = createSelector(todoSelector, state => state.loading);

export const saving = createSelector(todoSelector, state => state.saving);
