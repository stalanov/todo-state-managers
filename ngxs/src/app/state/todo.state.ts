import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TodoService } from '../services/todo.service';
import * as TodoActions from './todo.actions';
import { Todo, TodoList } from '../shared/types';

export interface TodoStateModel {
  todoList: TodoList;
  loading: boolean;
  saving: boolean;
}

const TODO_STATE_TOKEN = new StateToken<TodoStateModel>('todo');

@State({
  name: TODO_STATE_TOKEN,
  defaults: {
    todoList: [],
    loading: false,
    saving: false
  }
})
@Injectable()
export class TodoState {
  @Selector([TODO_STATE_TOKEN])
  static todoList(state: TodoStateModel): TodoList {
    return state.todoList;
  }

  @Selector([TODO_STATE_TOKEN])
  static loading(state: TodoStateModel): boolean {
    return state.loading;
  }

  @Selector([TODO_STATE_TOKEN])
  static saving(state: TodoStateModel): boolean {
    return state.saving;
  }

  constructor(private todoService: TodoService) {}

  @Action(TodoActions.Load)
  getTodoList(ctx: StateContext<TodoStateModel>, { params }: TodoActions.Load): Observable<TodoList> {
    ctx.patchState({ loading: true });
    return this.todoService.getTodoList(params).pipe(
      tap(todoList =>
        ctx.setState(
          patch({
            todoList,
            loading: false
          })
        )
      )
    );
  }

  @Action(TodoActions.Add)
  addTodo(ctx: StateContext<TodoStateModel>, { todo }: TodoActions.Add): Observable<Todo> {
    ctx.patchState({ saving: true });
    return this.todoService.addTodo(todo).pipe(
      tap(newTodo =>
        ctx.setState(
          patch({
            todoList: append([newTodo]),
            saving: false
          })
        )
      )
    );
  }

  @Action(TodoActions.Remove)
  removeTodo(ctx: StateContext<TodoStateModel>, { todo }: TodoActions.Remove): Observable<{}> {
    ctx.patchState({ saving: true });
    return this.todoService.removeTodo(todo).pipe(
      tap(() =>
        ctx.setState(
          patch({
            todoList: removeItem<Todo>(item => item.id === todo.id),
            saving: false
          })
        )
      )
    );
  }

  @Action(TodoActions.Update)
  updateTodo(ctx: StateContext<TodoStateModel>, { todo }: TodoActions.Update): Observable<Todo> {
    ctx.patchState({ saving: true });
    return this.todoService.updateTodo(todo).pipe(
      tap(updatedTodo =>
        ctx.setState(
          patch({
            todoList: updateItem<Todo>(item => item.id === updatedTodo.id, updatedTodo),
            saving: false
          })
        )
      )
    );
  }
}
