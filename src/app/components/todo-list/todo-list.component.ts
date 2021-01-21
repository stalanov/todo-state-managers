import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
  isSaving$: Observable<boolean> = this.todoQuery.selectSaving();
  isLoading$: Observable<boolean> = this.todoQuery.selectLoading();

  constructor(private todoService: TodoService, private todoQuery: TodoQuery) {}

  ngOnInit(): void {
    this.fetchTodoList({});
  }

  onComplete(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }

  onAdd(): void {
    const todo: Todo = {
      title: this.newTodoInput,
      completed: false
    };
    this.todoService.addTodo(todo).subscribe();
    this.newTodoInput = '';
  }

  onRemove(todo: Todo): void {
    this.todoService.removeTodo(todo).subscribe();
  }

  onFilter(params: Partial<TodoParams>): void {
    this.fetchTodoList(params);
  }

  trackByFn(_: number, item: Todo): number {
    return item.id;
  }

  private fetchTodoList(params: Partial<TodoParams>): void {
    this.todoService.getTodoList(params).subscribe();
  }
}
