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
  isSaving$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodoList({});
  }

  onComplete(todo: Todo): void {
    this.wrapSaving(this.todoService.updateTodo(todo)).subscribe(
      updatedTodo =>
        (this.todoList = this.todoList.reduce((list, item) => {
          item.id === updatedTodo.id ? list.push(updatedTodo) : list.push(item);
          return list;
        }, [] as TodoList))
    );
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false
    };
    this.wrapSaving(this.todoService.addTodo(todo)).subscribe(newTodo => (this.todoList = [...this.todoList, newTodo]));
    this.newTodoInput = '';
  }

  onRemove(todo: Todo): void {
    this.wrapSaving(this.todoService.removeTodo(todo)).subscribe(
      () => (this.todoList = this.todoList.filter(item => item.id !== todo.id))
    );
  }

  onFilter(params: Partial<TodoParams>): void {
    this.fetchTodoList(params);
  }

  trackByFn(_: number, item: Todo): number {
    return item.id;
  }

  private fetchTodoList(params: Partial<TodoParams>): void {
    this.isLoading$.next(true);
    this.todoService
      .getTodoList(params)
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe(list => (this.todoList = list));
  }

  private wrapSaving<T>(request: Observable<T>): Observable<T> {
    this.isSaving$.next(true);
    return request.pipe(finalize(() => this.isSaving$.next(false)));
  }
}
