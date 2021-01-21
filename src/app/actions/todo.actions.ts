import { createAction, props } from '@ngrx/store';

import { Todo, TodoList, TodoParams } from '../shared/types';

export const loadTodoList = createAction('[Todo] Load Todo List', props<{ params: Partial<TodoParams> }>());

export const loadTodoListSuccess = createAction('[Todo] Load Todo List Success', props<{ todoList: TodoList }>());

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());

export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo }>());

export const removeTodo = createAction('[Todo] Remove Todo', props<{ todo: Todo }>());

export const removeTodoSuccess = createAction('[Todo] Remove Todo Success', props<{ id: number }>());

export const updateTodo = createAction('[Todo] Update Todo', props<{ todo: Todo }>());

export const updateTodoSuccess = createAction('[Todo] Update Todo Success', props<{ todo: Todo }>());
