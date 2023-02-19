import { createReducer, on } from '@ngrx/store';
import { create } from 'mutative';
import { TodoList } from '../models/todo-list.model';
import { TodoActions } from './todos.actions';

export interface State {
  todoLists: TodoList[];
}

export const initialState: State = {
  todoLists: [
    {
      id: '1',
      title: 'Learn Angular',
      items: [
        { done: false, description: 'Angular Material Guide' },
        { done: false, description: 'Angular Components and Containers Guide' },
        { done: false, description: 'Angular Testing Guide' },
      ],
    },
    {
      id: '2',
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
  on(TodoActions.todoListChanged, (state, { todoListId, changedList }) =>
    create(state, (draft) => {
      draft.todoLists = draft.todoLists.map((todoList) => {
        if (todoList.id === todoListId) {
          return changedList;
        }

        return todoList;
      });
    })
  ),
  on(TodoActions.todoListDeleted, (state, { id }) =>
    create(state, (draft) => {
      draft.todoLists = draft.todoLists.filter(
        (todoList) => todoList.id !== id
      );
    })
  ),
  on(TodoActions.todoListAdded, (state) => {
    const id = window.crypto.randomUUID();

    return create(state, (draft) => {
      draft.todoLists.push({
        id,
        title: 'New Todo List',
        items: [],
      });
    });
  })
);
