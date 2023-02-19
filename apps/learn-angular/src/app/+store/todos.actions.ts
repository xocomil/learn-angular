import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TodoList } from '../models/todo-list.model';

export const TodoActions = createActionGroup({
  source: 'Todo Lists',
  events: {
    'Todo List Changed': props<{ todoListId: string; changedList: TodoList }>(),
    'Todo List Deleted': props<{ id: string }>(),
    'Todo List Added': emptyProps(),
  },
});
