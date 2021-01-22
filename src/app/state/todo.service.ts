import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Todo, TodoList, TodoParams, TodoQueryParams } from '../shared/types';
import { TodoStore } from './todo.store';

type ChangeStateFunction = (state: boolean) => void;

const triggerFlag = (stateFunction: ChangeStateFunction) => <T>(source$: Observable<T>): Observable<T> => {
  stateFunction(true);
  return source$.pipe(finalize(() => stateFunction(false)));
};

@Injectable()
export class TodoService {
  setLoading: ChangeStateFunction = (state: boolean) => this.todoStore.setLoading(state);
  setSaving: ChangeStateFunction = (state: boolean) => this.todoStore.setSaving(state);

  constructor(private http: HttpClient, private todoStore: TodoStore) {}

  getTodoList(todoParams: Partial<TodoParams> = {}): Observable<TodoList> {
    const params: Partial<TodoQueryParams> = {};
    Object.entries(todoParams).forEach(([key, value]) => (params[key] = value.toString()));
    return this.http
      .get<TodoList>(this.getUrl(), { params })
      .pipe(
        triggerFlag(this.setLoading),
        tap(list => this.todoStore.set(list))
      );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.getUrl(), todo).pipe(
      triggerFlag(this.setSaving),
      tap(newTodo => this.todoStore.add(newTodo))
    );
  }

  removeTodo(todo: Todo): Observable<{}> {
    return this.http.delete(this.getUrl(todo.id)).pipe(
      triggerFlag(this.setSaving),
      tap(() => this.todoStore.remove(todo.id))
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.getUrl(todo.id), todo).pipe(
      triggerFlag(this.setSaving),
      tap(updatedTodo => this.todoStore.update(updatedTodo.id, updatedTodo))
    );
  }

  private getUrl(id?: number): string {
    return `${environment.apiUrl}/todos` + (id != null ? `/${id}` : '');
  }
}
