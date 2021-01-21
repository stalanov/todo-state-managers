import { createReducer, on } from '@ngrx/store';

import * as TodoActions from '../actions/todo.actions';
import { TodoList } from '../shared/types';

export interface TodoState {
  todoList: TodoList;
  loading: boolean;
  saving: boolean;
}

const initialTodoState: TodoState = {
  todoList: [],
  loading: false,
  saving: false
};

export const todoReducer = createReducer(
  initialTodoState,

  on(TodoActions.load, state => ({
    ...state,
    loading: true
  })),

  on(TodoActions.loadSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
    loading: false
  })),

  on(TodoActions.add, state => ({
    ...state,
    saving: true
  })),

  on(TodoActions.addSuccess, (state, { todo }) => ({
    ...state,
    todoList: [...state.todoList, todo],
    saving: false
  })),

  on(TodoActions.remove, state => ({
    ...state,
    saving: true
  })),

  on(TodoActions.removeSuccess, (state, { id }) => ({
    ...state,
    todoList: state.todoList.filter(todo => todo.id !== id),
    saving: false
  })),

  on(TodoActions.update, state => ({
    ...state,
    saving: true
  })),

  on(TodoActions.updateSuccess, (state, { todo }) => {
    const todoList = state.todoList.reduce((list, item) => {
      item.id === todo.id ? list.push(todo) : list.push(item);
      return list;
    }, [] as TodoList);

    return {
      ...state,
      todoList,
      saving: false
    };
  })
);
