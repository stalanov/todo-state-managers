import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Todo, TodoList, TodoParams } from 'src/app/shared/types';
import { TodoService, TodoQuery } from 'src/app/state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList$: Observable<TodoList> = this.todoQuery.todoList;
  newTodoInput = '';
  queryParams: Partial<TodoParams> = {};
  isSaving$: Observable<boolean> = this.todoQuery.selectSaving();
  isLoading$: Observable<boolean> = this.todoQuery.selectLoading();

  constructor(private todoService: TodoService, private todoQuery: TodoQuery) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  onComplete(todo: Todo): void {
    this.todoService
      .updateTodo(todo)
      .pipe(finalize(() => this.fetchTodos()))
      .subscribe();
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false
    };
    this.todoService
      .addTodo(todo)
      .pipe(
        finalize(() => {
          this.newTodoInput = '';
          this.fetchTodos();
        })
      )
      .subscribe();
    this.newTodoInput = '';
  }

  onRemove(todo: Todo): void {
    this.todoService
      .removeTodo(todo)
      .pipe(
        finalize(() => {
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
    this.todoService.getTodoList(this.queryParams).subscribe();
  }
}
