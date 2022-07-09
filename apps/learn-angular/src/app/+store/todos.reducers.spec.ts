import { createFakeTodoListItem } from '../models/testing/todo-list-item';
import { addTodo, clearAll, deleteTodo, updateChecked } from './todos.actions';
import { State, todosReducer } from './todos.reducers';

describe('todos.reducers', () => {
  const initialState = ({ todos = [] }: Partial<State> = {}): State => ({
    todos,
  });

  describe('addTodo', () => {
    it('should add the todo from the action', () => {
      const testState = initialState();
      const todoListItem = createFakeTodoListItem();

      const result = todosReducer(testState, addTodo({ todoListItem }));
      const expected = { ...testState, todos: [todoListItem] };

      expect(result).toEqual(expected);
    });
  });

  describe('clearAll', () => {
    it('clear all todos from the state', () => {
      const testState = initialState({ todos: Array.from({ length: 5 }, createFakeTodoListItem) });

      const result = todosReducer(testState, clearAll());

      expect(result.todos.length).toBe(0);
    });
  });

  describe('updateChecked', () => {
    [true, false].forEach((testCase) => {
      it(`set the checked value on the appropriate TodoListItem: [${testCase}]`, () => {
        const testState = initialState({ todos: Array.from({ length: 5 }, () => createFakeTodoListItem({ done: !testCase })) });
        const arrayIndex = 2;

        expect(testState.todos.find((todo) => todo.done === testCase)).toBeUndefined();

        const result = todosReducer(testState, updateChecked({ arrayIndex, checked: testCase }));

        expect(result.todos[arrayIndex].done).toBe(testCase);
      });
    });
  });

  describe('deleteTodo', () => {
    it('delete the appropriate TodoListItem', () => {
      const testState = initialState({ todos: Array.from({ length: 5 }, createFakeTodoListItem) });
      const arrayIndex = 2;

      const expectedResults = testState.todos.filter((_, index) => index !== arrayIndex);

      const result = todosReducer(testState, deleteTodo({ arrayIndex }));

      expect(result.todos.length).toBe(4);
      expect(result.todos).toEqual(expectedResults);
    });
  });
});
