import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TodoService } from 'src/app/services/todo.service';
import { Todo, TodoList, TodoParams } from 'src/app/shared/types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
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

  onComplete(todo: Todo, index: number): void {
    this.wrapSaving(this.todoService.updateTodo(todo)).subscribe(updatedTodo => (this.todoList[index] = updatedTodo));
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false
    };
    this.wrapSaving(this.todoService.addTodo(todo)).subscribe(newTodo => (this.todoList = [...this.todoList, newTodo]));
    this.newTodoInput = '';
  }

  onRemove(todo: Todo, index: number): void {
    this.wrapSaving(this.todoService.removeTodo(todo)).subscribe(() => this.todoList.splice(index, 1));
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
      .subscribe(list => (this.todoList = list));
  }

  private wrapSaving<T>(request: Observable<T>): Observable<T> {
    this.isSaving$.next(true);
    return request.pipe(finalize(() => this.isSaving$.next(false)));
  }
}
