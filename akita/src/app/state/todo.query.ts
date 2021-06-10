import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { TodoState, TodoStore } from './todo.store';
import { TodoList } from '../shared/types';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoQuery extends QueryEntity<TodoState> {
  todoList$: Observable<TodoList> = this.selectAll();

  constructor(protected store: TodoStore) {
    super(store);
  }

  selectSaving(): Observable<boolean> {
    return this.select(state => state.saving);
  }
}
