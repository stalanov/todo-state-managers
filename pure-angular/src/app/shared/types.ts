export type Todo = {
  id?: number;
  title: string;
  completed: boolean;
};

export type TodoList = Todo[];

export type TodoParams = {
  completed: boolean;
};

export type TodoQueryParams = Record<keyof TodoParams, string>;

export enum CompleteFilter {
  ALL,
  COMPLETED,
  NON_COMPLETED
}
