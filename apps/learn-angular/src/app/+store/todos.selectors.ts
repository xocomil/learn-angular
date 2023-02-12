import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as TodoListState } from './todos.reducers';

const selectTodoState = createFeatureSelector<TodoListState>('todoState');

export const selectTodoList = (id: string) => createSelector(selectTodoState, (state) => state.todoLists.find((item) => item.id === id));

export const selectListIds = createSelector(selectTodoState, (state) => state.todoLists.map((list) => list.id));

export const todoLists = createSelector(selectTodoState, (state) => state.todoLists);
