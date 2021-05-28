import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as TodoActions from '../actions/todo.actions';
import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoEffects {
  loadTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.load),
      switchMap(({ params }) =>
        this.todoService.getTodoList(params).pipe(
          map(todoList =>
            TodoActions.loadSuccess({
              todoList
            })
          )
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.add),
      switchMap(({ todo }) =>
        this.todoService.addTodo(todo).pipe(
          map(addedTodo =>
            TodoActions.addSuccess({
              todo: addedTodo
            })
          )
        )
      )
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.remove),
      switchMap(({ todo }) =>
        this.todoService.removeTodo(todo).pipe(
          map(() =>
            TodoActions.removeSuccess({
              id: todo.id
            })
          )
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.update),
      switchMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map(updatedTodo =>
            TodoActions.updateSuccess({
              update: {
                id: updatedTodo.id,
                changes: updatedTodo
              }
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
