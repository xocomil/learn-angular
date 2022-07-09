import { createFakeTodoListItem } from '../models/testing/todo-list-item';
import { TodoListItem } from '../models/todo-list-item';
import { selectTodoList } from './todos.selectors';

describe('todos.selectors', () => {
  describe('selectTodoList', () => {
    it('should return the list of todos', () => {
      const todos: TodoListItem[] = Array.from({ length: 5 }, createFakeTodoListItem);

      expect(selectTodoList.projector({ todos })).toEqual(todos);
    });
  });
});
