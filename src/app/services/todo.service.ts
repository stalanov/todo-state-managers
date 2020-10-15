import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Todo, TodoList, TodoParams, TodoQueryParams } from '../shared/types';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodoList(todoParams: Partial<TodoParams> = {}): Observable<TodoList> {
    const params: Partial<TodoQueryParams> = {};
    Object.entries(todoParams).forEach(
      ([key, value]) => (params[key] = value.toString())
    );
    return this.http.get<TodoList>(this.getUrl(), { params });
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.getUrl(), todo);
  }

  removeTodo(todo: Todo): Observable<{}> {
    return this.http.delete(this.getUrl(todo.id));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.getUrl(todo.id), todo);
  }

  private getUrl(id?: number): string {
    return `${environment.apiUrl}/todos` + (id != null ? `/${id}` : '');
  }
}
