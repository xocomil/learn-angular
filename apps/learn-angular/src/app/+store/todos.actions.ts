import { createActionGroup, props } from '@ngrx/store';
import { TodoList } from '../models/todo-list.model';

export const TodoActions = createActionGroup({
  source: 'Todo List',
  events: {
    'Todo List Changed': props<{ todoListId: number; changedList: TodoList }>(),
  },
});
