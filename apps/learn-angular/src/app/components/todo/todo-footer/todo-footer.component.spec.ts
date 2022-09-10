import { faker } from '@faker-js/faker/locale/en';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { createComponentFactory } from '@ngneat/spectator';
import { TodoFooterComponent } from './todo-footer.component';

describe('TodoFooterComponent', () => {
  const createComponent = createComponentFactory({ component: TodoFooterComponent });

  it('should create', () => {
    const spectator = createComponent();

    expect(spectator).toBeTruthy();
  });

  describe('addNewTodo', () => {
    it('should emit the new todo on the newTodoAddedOutput', () => {
      const newTodoDescription = faker.random.words();

      const spectator = createComponent();
      spectator.component['newTodoDescription'] = newTodoDescription;

      const outputSpy = subscribeSpyTo(spectator.component.newTodoAdded);

      spectator.component.addNewTodo();

      expect(outputSpy.getValues()).toEqual([{ description: newTodoDescription, done: false }]);

      outputSpy.unsubscribe();
    });

    it('should clear newTodoDescription after it emits', () => {
      const newTodoDescription = faker.random.words();

      const spectator = createComponent();
      spectator.component['newTodoDescription'] = newTodoDescription;

      spectator.component.addNewTodo();

      spectator.component['newTodoDescription'] = '';
    });
  });

  describe('clearAll', () => {
    it('should emit on the clearAllPushed output', () => {
      const spectator = createComponent();

      const outputSpy = subscribeSpyTo(spectator.component.clearAllPushed);

      spectator.component.clearAll();

      expect(outputSpy.getValuesLength()).toBe(1);

      outputSpy.unsubscribe();
    });
  });
});
