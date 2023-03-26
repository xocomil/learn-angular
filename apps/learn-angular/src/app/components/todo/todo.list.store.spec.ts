import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { expect } from '@jest/globals';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { TodoListStore } from './todo.list.store';

describe('TodoListStore', () => {
  const createService = createServiceFactory({
    service: TodoListStore,
    providers: [provideMockStore()],
  });

  it('should be created', () => {
    const spectator = createService();

    expect(spectator).toBeTruthy();
  });

  describe('toggleEditTitle', () => {
    it('should toggle editTitle', () => {
      const spectator = createService();

      const observerSpy = subscribeSpyTo(spectator.service.editTitle$);

      spectator.service.toggleEditTitle();
      spectator.service.toggleEditTitle();

      expect(observerSpy.getValues()).toEqual([false, true, false]);

      observerSpy.unsubscribe();
    });

    it('should toggle editTitle', () => {
      const spectator = createService();

      const observerSpy = subscribeSpyTo(spectator.service.editTitleIcon$);

      spectator.service.toggleEditTitle();
      spectator.service.toggleEditTitle();

      expect(observerSpy.getValues()).toEqual(['edit', 'save', 'edit']);

      observerSpy.unsubscribe();
    });
  });
});
