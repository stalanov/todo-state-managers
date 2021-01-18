import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Todo } from '../shared/types';

export interface TodoState extends EntityState<Todo, number> {
  saving: boolean;
}

const initialState: TodoState = {
  saving: false
};

@Injectable()
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState> {
  constructor() {
    super(initialState);
  }

  setSaving(isSaving: boolean): void {
    this.update({ saving: isSaving });
  }
}
