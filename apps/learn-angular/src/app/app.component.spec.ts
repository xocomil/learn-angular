import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { faker } from '@faker-js/faker/locale/en';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { addTodo, clearAll } from './+store/todos.actions';
import { State } from './+store/todos.reducers';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const description = 'Test todo item description';

  const initialState: { todoState: State } = {
    todoState: {
      todos: [{ description, done: false }],
    },
  };

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [FormsModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule],
    providers: [provideMockStore({ initialState })],
  });

  it('should create the app', () => {
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
});
