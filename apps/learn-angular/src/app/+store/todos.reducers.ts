import { createReducer, on } from '@ngrx/store';
import { TodoListItem } from '../models/todo-list-item';
import { addTodo, clearAll } from './todos.actions';

export interface State {
  todos: TodoListItem[];
}

export const initialState: State = {
  todos: [
    {
      done: false,
      description: 'learn angular',
    },
    { done: false, description: 'attend the Angular Community Meetup' },
    { done: true, description: 'style with Angular Material' },
  ],
};

export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, props) => ({ ...state, todos: [...state.todos, props.todoListItem] })),
  on(clearAll, (state) => ({ ...state, todos: [] }))
);
