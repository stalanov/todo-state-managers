import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
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

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todoList: [],
    loading: false,
    saving: false
  }
})
@Injectable()
export class TodoState {
  @Selector()
  static todoList(state: TodoStateModel): TodoList {
    return state.todoList;
  }

  @Selector()
  static loading(state: TodoStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static saving(state: TodoStateModel): boolean {
    return state.saving;
  }

  constructor(private todoService: TodoService) {}

  @Action(TodoActions.Load)
  getTodoList(ctx: StateContext<TodoStateModel>, { params }: TodoActions.Load): Observable<TodoList> {
    ctx.patchState({ loading: true });
    return this.todoService.getTodoList(params).pipe(tap(todoList => ctx.patchState({ todoList, loading: false })));
  }

  @Action(TodoActions.Add)
  addTodo(ctx: StateContext<TodoStateModel>, { todo }: TodoActions.Add): Observable<Todo> {
    ctx.patchState({ saving: true });
    return this.todoService.addTodo(todo).pipe(
      tap(newTodo => {
        ctx.setState(state => ({
          ...state,
          todoList: [...state.todoList, newTodo],
          saving: false
        }));
      })
    );
  }

  @Action(TodoActions.Remove)
  removeTodo(ctx: StateContext<TodoStateModel>, { todo }: TodoActions.Remove): Observable<{}> {
    ctx.patchState({ saving: true });
    return this.todoService.removeTodo(todo).pipe(
      tap(() => {
        ctx.setState(state => ({
          ...state,
          todoList: state.todoList.filter(item => item.id !== todo.id),
          saving: false
        }));
      })
    );
  }

  @Action(TodoActions.Update)
  updateTodo(ctx: StateContext<TodoStateModel>, { todo }: TodoActions.Update): Observable<Todo> {
    ctx.patchState({ saving: true });
    return this.todoService.updateTodo(todo).pipe(
      tap(updatedTodo => {
        ctx.setState(state => ({
          ...state,
          todoList: state.todoList.reduce((list, item) => {
            item.id === updatedTodo.id ? list.push(updatedTodo) : list.push(item);
            return list;
          }, [] as TodoList),
          saving: false
        }));
      })
    );
  }
}
