import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/reducers';
import { addTodo, loadTodoList, removeTodo, updateTodo } from 'src/app/actions/todo.actions';
import { todoList, todoLoading, todoSaving } from 'src/app/selectors/todo.selectors';
import { Todo, TodoList, TodoParams } from 'src/app/shared/types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList$: Observable<TodoList> = this.store.pipe(select(todoList));
  newTodoInput = '';
  queryParams: Partial<TodoParams> = {};
  isSaving$: Observable<boolean> = this.store.pipe(select(todoLoading));
  isLoading$: Observable<boolean> = this.store.pipe(select(todoSaving));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.fetchTodoList();
  }

  onComplete(todo: Todo): void {
    this.store.dispatch(updateTodo({ todo }));
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false
    };
    this.store.dispatch(addTodo({ todo }));
    this.newTodoInput = '';
  }

  onRemove(todo: Todo): void {
    this.store.dispatch(removeTodo({ todo }));
  }

  onFilter(params: Partial<TodoParams>): void {
    this.queryParams = params;
    this.fetchTodoList();
  }

  trackByFn(_: number, item: Todo): number {
    return item.id;
  }

  private fetchTodoList(): void {
    this.store.dispatch(loadTodoList({ params: this.queryParams }));
  }
}
