import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';

const todoSelector = (state: AppState) => state.todo;

export const todoList = createSelector(todoSelector, state => state.todoList);

export const todoLoading = createSelector(todoSelector, state => state.loading);

export const todoSaving = createSelector(todoSelector, state => state.saving);
