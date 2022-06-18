import { createAction, props } from '@ngrx/store';
import { TodoListItem } from '../models/todo-list-item';

export const addTodo = createAction('[Todo Component] Add Todo', props<{ todoListItem: TodoListItem }>());
export const clearAll = createAction('[Todo Component] Clear All');
