import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TodoService } from 'src/app/services/todo.service';
import { Todo, TodoList, TodoParams } from 'src/app/shared/types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList$: Observable<TodoList> = this.todoService.todoList$;
  isSaving$: BehaviorSubject<boolean> = this.todoService.isSaving$;
  isLoading$: BehaviorSubject<boolean> = this.todoService.isLoading$;
  newTodoInput = '';

  constructor(private todoService: TodoService) {}

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
