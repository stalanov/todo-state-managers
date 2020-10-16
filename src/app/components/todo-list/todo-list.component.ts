import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TodoService } from 'src/app/services/todo.service';
import { Todo, TodoList, TodoParams } from 'src/app/shared/types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList: TodoList = [];
  newTodoInput = '';
  queryParams: Partial<TodoParams> = {};
  isSaving$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  onComplete(todo: Todo): void {
    this.isSaving$.next(true);
    this.todoService
      .updateTodo(todo)
      .pipe(
        finalize(() => {
          this.isSaving$.next(false);
          this.fetchTodos();
        })
      )
      .subscribe();
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false,
    };
    this.isSaving$.next(true);
    this.todoService
      .addTodo(todo)
      .pipe(
        finalize(() => {
          this.isSaving$.next(false);
          this.newTodoInput = '';
          this.fetchTodos();
        })
      )
      .subscribe();
    this.newTodoInput = '';
  }

  onRemove(todo: Todo): void {
    this.isSaving$.next(true);
    this.todoService
      .removeTodo(todo)
      .pipe(
        finalize(() => {
          this.isSaving$.next(false);
          this.fetchTodos();
        })
      )
      .subscribe();
  }

  onFilter(params: Partial<TodoParams>): void {
    this.queryParams = params;
    this.fetchTodos();
  }

  private fetchTodos(): void {
    this.isLoading$.next(true);
    this.todoService
      .getTodoList(this.queryParams)
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((list) => (this.todoList = list));
  }
}
