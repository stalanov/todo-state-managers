import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Todo, TodoList, TodoParams } from '../shared/types';

export const load = createAction('[Todo] Load Todo List', props<{ params: Partial<TodoParams> }>());

export const loadSuccess = createAction('[Todo] Load Todo List Success', props<{ todoList: TodoList }>());

export const add = createAction('[Todo] Add Todo', props<{ todo: Todo }>());

export const addSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo }>());

export const remove = createAction('[Todo] Remove Todo', props<{ todo: Todo }>());

export const removeSuccess = createAction('[Todo] Remove Todo Success', props<{ id: number }>());

export const update = createAction('[Todo] Update Todo', props<{ todo: Todo }>());

export const updateSuccess = createAction('[Todo] Update Todo Success', props<{ update: Update<Todo> }>());
