import { MatCheckboxChange } from '@angular/material/checkbox';
import { faker } from '@faker-js/faker/locale/en';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  const createComponent = createComponentFactory({ component: TodoListComponent });

  it('should create', () => {
    const spectator = createComponent();

    expect(spectator).toBeTruthy();
  });

  describe('todosList', () => {
    it('should start as an empty array', () => {
      const spectator = createComponent();

      expect(spectator.component.todosList).toEqual([]);
    });

    it('should set to an empty array when set to undefined', () => {
      const spectator = createComponent();

      const length = 3;

      spectator.component.todosList = Array.from({ length }, () => ({ description: faker.random.words(), done: false }));

      expect(spectator.component.todosList.length).toBe(length);

      spectator.component.todosList = undefined;

      expect(spectator.component.todosList).toEqual([]);
    });

    it('should set to the value passed', () => {
      const spectator = createComponent();
      const length = 3;
      const newTodos = Array.from({ length }, () => ({ description: faker.random.words(), done: false }));

      spectator.component.todosList = newTodos;

      expect(spectator.component.todosList).toEqual(newTodos);
    });
  });

  describe('checkedStateChanged', () => {
    it('should emit on the itemCheckedChanged output', () => {
      const spectator = createComponent();
      const outputSpy = subscribeSpyTo(spectator.component.itemCheckedChanged);
      const arrayIndex = faker.datatype.number({ min: 0 });
      const checked = faker.datatype.boolean();

      spectator.component.checkedStateChanged({ checked } as MatCheckboxChange, arrayIndex);

      expect(outputSpy.getValues()).toEqual([{ checked, arrayIndex }]);

      outputSpy.unsubscribe();
    });
  });

  describe('deleteItem', () => {
    it('should emit on the itemDeleted output', () => {
      const spectator = createComponent();
      const outputSpy = subscribeSpyTo(spectator.component.itemDeleted);
      const arrayIndex = faker.datatype.number({ min: 0 });

      spectator.component.deleteItem(arrayIndex);

      expect(outputSpy.getValues()).toEqual([{ arrayIndex }]);

      outputSpy.unsubscribe();
    });
  });
});
