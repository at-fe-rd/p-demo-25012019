import { todoReducer } from './book/book.reducers';

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const featureReducer: any = {
  todos: todoReducer as any
}
