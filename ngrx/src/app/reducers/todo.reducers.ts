import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as TodoActions from '../actions/todo.actions';
import { Todo } from '../shared/types';

export const todoKey = 'todo';

export interface TodoState extends EntityState<Todo> {
  loading: boolean;
  saving: boolean;
}

export const adapter = createEntityAdapter<Todo>();

const initialTodoState = adapter.getInitialState({
  loading: false,
  saving: false
});

export const todoReducer = createReducer(
  initialTodoState,

  on(TodoActions.load, state => ({
    ...state,
    loading: true
  })),

  on(TodoActions.loadSuccess, (state, { todoList }) => adapter.setAll(todoList, { ...state, loading: false })),

  on(TodoActions.add, state => ({
    ...state,
    saving: true
  })),

  on(TodoActions.addSuccess, (state, { todo }) => adapter.addOne(todo, { ...state, saving: false })),

  on(TodoActions.remove, state => ({
    ...state,
    saving: true
  })),

  on(TodoActions.removeSuccess, (state, { id }) => adapter.removeOne(id, { ...state, saving: false })),

  on(TodoActions.update, state => ({
    ...state,
    saving: true
  })),

  on(TodoActions.updateSuccess, (state, { update }) => adapter.updateOne(update, { ...state, saving: false }))
);
