import { MatCheckboxChange } from '@angular/material/checkbox';
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
    it('should dispatch an addNewTodo action', () => {
      const newTodoDescription = faker.random.words();

      const spectator = createComponent({ props: { newTodoDescription } });
      const store = spectator.inject(Store);
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      const expected = addTodo({ todoListItem: { description: newTodoDescription, done: false } });

      spectator.component.addNewTodo();

      expect(dispatchSpy).toHaveBeenCalledWith(expected);
    });

    it('should clear the newTodoDescription property', () => {
      const newTodoDescription = faker.random.words();

      const spectator = createComponent({ props: { newTodoDescription } });

      expect(spectator.component.newTodoDescription).toBe(newTodoDescription);

      spectator.component.addNewTodo();

      expect(spectator.component.newTodoDescription).toBe('');
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

        spectator.component.checkedStateChanged({ checked: testCase } as MatCheckboxChange, arrayIndex);

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

      spectator.component.deleteItem(arrayIndex);

      expect(dispatchSpy).toHaveBeenCalledWith(expected);
    });
  });
});
