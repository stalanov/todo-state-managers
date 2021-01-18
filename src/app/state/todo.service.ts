import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Todo, TodoList, TodoParams, TodoQueryParams } from '../shared/types';
import { TodoStore } from './todo.store';

type ChangeStateFunction = (state: boolean) => void;

@Injectable()
export class TodoService {
  setLoading: ChangeStateFunction = (state: boolean) => this.todoStore.setLoading(state);
  setSaving: ChangeStateFunction = (state: boolean) => this.todoStore.setSaving(state);

  constructor(private http: HttpClient, private todoStore: TodoStore) {}

  getTodoList(todoParams: Partial<TodoParams> = {}): Observable<TodoList> {
    const params: Partial<TodoQueryParams> = {};
    Object.entries(todoParams).forEach(([key, value]) => (params[key] = value.toString()));
    const request = this.http
      .get<TodoList>(this.getUrl(), { params })
      .pipe(tap(list => this.todoStore.set(list)));
    return this.stateWrap(request, this.setLoading);
  }

  addTodo(todo: Todo): Observable<Todo> {
    const request = this.http.post<Todo>(this.getUrl(), todo);
    return this.stateWrap(request, this.setSaving);
  }

  removeTodo(todo: Todo): Observable<{}> {
    const request = this.http.delete(this.getUrl(todo.id));
    return this.stateWrap(request, this.setSaving);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const request = this.http.put<Todo>(this.getUrl(todo.id), todo);
    return this.stateWrap(request, this.setSaving);
  }

  private getUrl(id?: number): string {
    return `${environment.apiUrl}/todos` + (id != null ? `/${id}` : '');
  }

  private stateWrap<T>(request: Observable<T>, stateFunction: (state: boolean) => void): Observable<T> {
    stateFunction(true);
    return request.pipe(finalize(() => stateFunction(false)));
  }
}
