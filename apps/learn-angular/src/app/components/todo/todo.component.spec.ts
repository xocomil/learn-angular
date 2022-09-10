import { faker } from '@faker-js/faker/locale/en';
import { createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { addTodo, clearAll, deleteTodo, updateChecked } from '../../+store/todos.actions';
import { State } from '../../+store/todos.reducers';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  const description = 'Test todo item description';

  const initialState: { todoState: State } = {
    todoState: {
      todos: [{ description, done: false }],
    },
  };

  const createComponent = createComponentFactory({ component: TodoComponent, providers: [provideMockStore({ initialState })] });

  it('should create', () => {
    const spectator = createComponent();

    expect(spectator).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const spectator = createComponent();

    expect(spectator.fixture).toMatchSnapshot();
  });

  describe('addNewTodo()', () => {
    it('should dispatch an addTodo action', () => {
      const newTodoDescription = faker.random.words();

      const spectator = createComponent();
      const store = spectator.inject(Store);
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      spectator.component.addNewTodo({ description: newTodoDescription, done: true });

      const expected = addTodo({ todoListItem: { description: newTodoDescription, done: true } });

      expect(dispatchSpy).toHaveBeenCalledWith(expected);
    });
  });

  describe('clearAll()', () => {
    it('should dispatch a clearAll action', () => {
      const spectator = createComponent();
      const store = spectator.inject(Store);
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      const expected = clearAll();

      spectator.component.clearAll();

      expect(dispatchSpy).toHaveBeenCalledWith(expected);
    });
  });

  describe('checkedStateChanged()', () => {
    [true, false].forEach((testCase) => {
      it(`should dispatch a updateChecked action: [${testCase}]`, () => {
        const spectator = createComponent();
        const store = spectator.inject(Store);
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        const arrayIndex = faker.datatype.number({ min: 0, max: 100 });

        const expected = updateChecked({ arrayIndex, checked: testCase });

        spectator.component.checkedStateChanged({ checked: testCase, arrayIndex });

        expect(dispatchSpy).toHaveBeenCalledWith(expected);
      });
    });
  });

  describe('deleteItem()', () => {
    it('should dispatch a deleteTodo action', () => {
      const spectator = createComponent();
      const store = spectator.inject(Store);
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const arrayIndex = faker.datatype.number({ min: 0, max: 100 });

      const expected = deleteTodo({ arrayIndex });

      spectator.component.deleteItem({ arrayIndex });

      expect(dispatchSpy).toHaveBeenCalledWith(expected);
    });
  });
});
