import { TodoModel } from 'app/models';

export interface RootState {
  todos: RootState.TodoState;
  pageData: RootState.PageState;
  router?: any;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type PageState = any[];
}
