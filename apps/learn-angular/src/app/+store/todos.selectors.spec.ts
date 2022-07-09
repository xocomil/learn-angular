import { faker } from '@faker-js/faker/locale/en';
import { TodoListItem } from '../models/todo-list-item';
import { selectTodoList } from './todos.selectors';

describe('todos.selectors', () => {
  describe('selectTodoList', () => {
    it('should return the list of todos', () => {
      const todos: TodoListItem[] = Array.from({ length: 5 }, () => ({
        done: faker.datatype.boolean(),
        description: faker.random.words(),
      }));

      expect(selectTodoList.projector({ todos })).toEqual(todos);
    });
  });
});
