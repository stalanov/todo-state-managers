import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Todo, TodoList, TodoParams, TodoQueryParams } from '../shared/types';

const triggerFlag = (flagSubject: BehaviorSubject<boolean>) => <T>(source$: Observable<T>): Observable<T> => {
  flagSubject.next(true);
  return source$.pipe(finalize(() => flagSubject.next(false)));
};

@Injectable()
export class TodoService {
  todoList$: BehaviorSubject<TodoList> = new BehaviorSubject([]);
  isSaving$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getTodoList(todoParams: Partial<TodoParams> = {}): Observable<TodoList> {
    const params: Partial<TodoQueryParams> = {};
    Object.entries(todoParams).forEach(([key, value]) => (params[key] = value.toString()));
    return this.http
      .get<TodoList>(this.getUrl(), { params })
      .pipe(
        triggerFlag(this.isLoading$),
        tap(todoList => this.todoList$.next(todoList))
      );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.getUrl(), todo).pipe(
      triggerFlag(this.isSaving$),
      tap(newTodo => this.todoList$.next([...this.todoList$.value, newTodo]))
    );
  }

  removeTodo(todo: Todo): Observable<{}> {
    return this.http.delete(this.getUrl(todo.id)).pipe(
      triggerFlag(this.isSaving$),
      tap(() => this.todoList$.next(this.todoList$.value.filter(item => item.id !== todo.id)))
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.getUrl(todo.id), todo).pipe(
      triggerFlag(this.isSaving$),
      tap(updatedTodo =>
        this.todoList$.next(
          this.todoList$.value.reduce((list, item) => {
            item.id === updatedTodo.id ? list.push(updatedTodo) : list.push(item);
            return list;
          }, [] as TodoList)
        )
      )
    );
  }

  private getUrl(id?: number): string {
    return `${environment.apiUrl}/todos` + (id != null ? `/${id}` : '');
  }
}
