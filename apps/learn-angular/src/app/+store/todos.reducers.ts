import { createReducer, on } from '@ngrx/store';
import { TodoListItem } from '../models/todo-list-item';
import { addTodo, clearAll, deleteTodo, updateChecked } from './todos.actions';

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
  on(clearAll, (state) => ({ ...state, todos: [] })),
  on(updateChecked, (state, { arrayIndex, checked }) => {
    const arrayCopy = [...state.todos];

    arrayCopy[arrayIndex] = { ...arrayCopy[arrayIndex], done: checked };

    return { ...state, todos: arrayCopy };
  }),
  on(deleteTodo, (state, { arrayIndex }) => ({ ...state, todos: state.todos.filter((_, i) => i !== arrayIndex) }))
);
