import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import {
  addTodo,
  addTodoSuccess,
  loadTodoList,
  loadTodoListSuccess,
  removeTodo,
  removeTodoSuccess,
  updateTodo,
  updateTodoSuccess
} from '../actions/todo.actions';
import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoEffects {
  loadTodoList = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoList),
      switchMap(({ params }) =>
        this.todoService.getTodoList(params).pipe(map(todoList => loadTodoListSuccess({ todoList })))
      )
    )
  );

  addTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({ todo }) =>
        this.todoService.addTodo(todo).pipe(map(addedTodo => addTodoSuccess({ todo: addedTodo })))
      )
    )
  );

  removeTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap(({ todo }) => this.todoService.removeTodo(todo).pipe(map(() => removeTodoSuccess({ id: todo.id }))))
    )
  );

  updateTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(map(updatedTodo => updateTodoSuccess({ todo: updatedTodo })))
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
