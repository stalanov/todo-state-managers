import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/shared/types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo: Todo;
  @Input() disabled: boolean;

  @Output() completeTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() removeTodo: EventEmitter<Todo> = new EventEmitter();

  onChange(completed: boolean): void {
    const { id, title } = this.todo;
    this.completeTodo.emit({ id, title, completed });
  }
}
