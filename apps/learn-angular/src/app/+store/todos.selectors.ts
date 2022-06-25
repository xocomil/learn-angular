import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as TodoListState } from './todos.reducers';

const todoStateSelector = createFeatureSelector<TodoListState>('todoState');

export const todoListSelector = createSelector(todoStateSelector, (state) => state.todos);
