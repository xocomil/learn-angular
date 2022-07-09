import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as TodoListState } from './todos.reducers';

const selectTodoState = createFeatureSelector<TodoListState>('todoState');

export const selectTodoList = createSelector(selectTodoState, (state) => state.todos);
