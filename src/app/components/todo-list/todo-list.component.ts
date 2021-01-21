import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/reducers';
import * as TodoActions from 'src/app/actions/todo.actions';
import * as TodoSelectors from 'src/app/selectors/todo.selectors';
import { Todo, TodoList, TodoParams } from 'src/app/shared/types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList$: Observable<TodoList> = this.store.pipe(select(TodoSelectors.list));
  newTodoInput = '';
  isSaving$: Observable<boolean> = this.store.pipe(select(TodoSelectors.saving));
  isLoading$: Observable<boolean> = this.store.pipe(select(TodoSelectors.loading));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.fetchTodoList({});
  }

  onComplete(todo: Todo): void {
    this.store.dispatch(TodoActions.update({ todo }));
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false
    };
    this.store.dispatch(TodoActions.add({ todo }));
    this.newTodoInput = '';
  }

  onRemove(todo: Todo): void {
    this.store.dispatch(TodoActions.remove({ todo }));
  }

  onFilter(params: Partial<TodoParams>): void {
    this.fetchTodoList(params);
  }

  trackByFn(_: number, item: Todo): number {
    return item.id;
  }

  private fetchTodoList(params: Partial<TodoParams>): void {
    this.store.dispatch(TodoActions.load({ params }));
  }
}
