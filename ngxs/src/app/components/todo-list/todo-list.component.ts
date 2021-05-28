import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Todo, TodoList, TodoParams } from 'src/app/shared/types';
import { TodoState } from 'src/app/state/todo.state';
import * as TodoActions from '../../state/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.todoList) todoList$: Observable<TodoList>;
  @Select(TodoState.saving) isSaving$: Observable<boolean>;
  @Select(TodoState.loading) isLoading$: Observable<boolean>;
  newTodoInput = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchTodoList({});
  }

  onComplete(todo: Todo): void {
    this.store.dispatch(new TodoActions.Update(todo));
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false
    };
    this.store.dispatch(new TodoActions.Add(todo));
    this.newTodoInput = '';
  }

  onRemove(todo: Todo): void {
    this.store.dispatch(new TodoActions.Remove(todo));
  }

  onFilter(params: Partial<TodoParams>): void {
    this.fetchTodoList(params);
  }

  trackByFn(_: number, item: Todo): number {
    return item.id;
  }

  private fetchTodoList(params: Partial<TodoParams>): void {
    this.store.dispatch(new TodoActions.Load(params));
  }
}
