import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/shared/types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo: Todo;
  @Input() disabled: boolean;

  @Output() complete: EventEmitter<Todo> = new EventEmitter();
  @Output() remove: EventEmitter<Todo> = new EventEmitter();

  onChange(completed: boolean): void {
    const { id, title } = this.todo;
    this.complete.emit({ id, title, completed })
  }
}
