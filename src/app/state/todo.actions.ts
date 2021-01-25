import { Todo, TodoParams } from '../shared/types';

export class Load {
  static readonly type = '[Todo] LoadTodoList';
  constructor(public params: Partial<TodoParams>) {}
}

export class Add {
  static readonly type = '[Todo] AddTodo';
  constructor(public todo: Todo) {}
}

export class Remove {
  static readonly type = '[Todo] RemoveTodo';
  constructor(public todo: Todo) {}
}

export class Update {
  static readonly type = '[Todo] UpdateTodo';
  constructor(public todo: Todo) {}
}
