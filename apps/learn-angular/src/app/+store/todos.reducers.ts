import { createReducer, on } from '@ngrx/store';
import { TodoListItem } from '../models/todo-list-item';
import { addTodo, clearAll, deleteTodo, updateChecked } from './todos.actions';

export interface State {
  todos: TodoListItem[];
  todoLists: {
    id: number;
    title: string;
    items: TodoListItem[];
  }[];
}

export const initialState: State = {
  todos: [],
  todoLists: [
    {
      id: 1,
      title: 'Learn Angular',
      items: [
        { done: false, description: 'Angular Material Guide' },
        { done: false, description: 'Angular Components and Containers Guide' },
        { done: false, description: 'Angular Testing Guide' },
      ],
    },
    {
      id: 2,
      title: 'General Todo List',
      items: [
        {
          done: false,
          description: 'learn angular',
        },
        { done: false, description: 'attend the Angular Community Meetup' },
        { done: true, description: 'style with Angular Material' },
      ],
    },
  ],
};

export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, props) => ({ ...state, todos: [...state.todos, props.todoListItem] })),
  on(clearAll, (state) => ({ ...state, todos: [] })),
  on(updateChecked, (state, { arrayIndex, checked }) => ({
    ...state,
    todos: state.todos.map((todo, index) => (index === arrayIndex ? { ...todo, done: checked } : todo)),
  })),
  on(deleteTodo, (state, { arrayIndex }) => ({ ...state, todos: state.todos.filter((_, i) => i !== arrayIndex) }))
);
