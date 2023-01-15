import { createReducer, on } from '@ngrx/store';
import { TodoList } from '../models/todo-list.model';
import { TodoActions } from './todos.actions';

export interface State {
  todoLists: TodoList[];
}

export const initialState: State = {
  todoLists: [
    {
      id: 1,
      title: 'Learn Angular',
      items: [
        {done: false, description: 'Angular Material Guide'},
        {done: false, description: 'Angular Components and Containers Guide'},
        {done: false, description: 'Angular Testing Guide'},
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
        {done: false, description: 'attend the Angular Community Meetup'},
        {done: true, description: 'style with Angular Material'},
      ],
    },
  ],
};

export const todosReducer = createReducer(initialState, on(TodoActions.todoListChanged, (state, {todoListId, changedList}) => ({
  ...state,
  todoLists: state.todoLists.map(todoList => {
    if (todoList.id === todoListId) {
      return changedList;
    }

    return todoList;
  })
})));
