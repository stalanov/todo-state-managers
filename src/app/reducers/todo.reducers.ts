import { createReducer, on } from '@ngrx/store';

import {
  loadTodoListSuccess,
  addTodoSuccess,
  removeTodoSuccess,
  updateTodoSuccess,
  loadTodoList,
  addTodo,
  removeTodo
} from '../actions/todo.actions';
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

  on(loadTodoList, state => ({
    ...state,
    loading: true
  })),

  on(loadTodoListSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
    loading: false
  })),

  on(addTodo, state => ({
    ...state,
    saving: true
  })),

  on(addTodoSuccess, (state, { todo }) => ({
    ...state,
    todoList: [...state.todoList, todo],
    saving: false
  })),

  on(removeTodo, state => ({
    ...state,
    saving: true
  })),

  on(removeTodoSuccess, (state, { id }) => ({
    ...state,
    todoList: state.todoList.filter(todo => todo.id !== id),
    saving: false
  })),

  on(updateTodoSuccess, (state, { todo }) => {
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
