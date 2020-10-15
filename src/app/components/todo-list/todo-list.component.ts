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
  newTodo = '';
  params: Partial<TodoParams> = {};
  isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  onComplete(todo: Todo): void {
    this.isDisabled$.next(true);
    this.todoService
      .updateTodo(todo)
      .pipe(
        finalize(() => {
          this.isDisabled$.next(false);
          this.fetchTodos();
        })
      )
      .subscribe();
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodo,
      completed: false,
    };
    this.isDisabled$.next(true);
    this.todoService
      .addTodo(todo)
      .pipe(
        finalize(() => {
          this.isDisabled$.next(false);
          this.newTodo = '';
          this.fetchTodos();
        })
      )
      .subscribe();
    this.newTodo = '';
  }

  onRemove(todo: Todo): void {
    this.isDisabled$.next(true);
    this.todoService
      .removeTodo(todo)
      .pipe(
        finalize(() => {
          this.isDisabled$.next(false);
          this.fetchTodos();
        })
      )
      .subscribe();
  }

  onFilter(params: Partial<TodoParams>): void {
    this.params = params;
    this.fetchTodos();
  }

  private fetchTodos(): void {
    this.isLoading$.next(true);
    this.todoService
      .getTodoList(this.params)
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((list) => (this.todoList = list));
  }
}
