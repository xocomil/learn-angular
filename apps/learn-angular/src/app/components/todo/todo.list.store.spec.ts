import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { expect } from '@jest/globals';
import { createServiceFactory, mockProvider } from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { create } from 'mutative';
import { Subject } from 'rxjs';
import { TodoActions } from '../../+store/todos.actions';
import { TodoListItem } from '../../models/todo-list-item';
import { TodoList } from '../../models/todo-list.model';
import { initialState, TodoListStore } from './todo.list.store';

describe('TodoListStore', () => {
  const todoList$ = new Subject<TodoList | undefined>();

  const storeStub: Partial<Store> = {
    select: jest.fn(() => todoList$),
  };

  const createService = createServiceFactory({
    service: TodoListStore,
    providers: [mockProvider(Store, storeStub)],
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

    it('should toggle editTitleIcon', () => {
      const spectator = createService();

      const observerSpy = subscribeSpyTo(spectator.service.editTitleIcon$);

      spectator.service.toggleEditTitle();
      spectator.service.toggleEditTitle();

      expect(observerSpy.getValues()).toEqual(['edit', 'save', 'edit']);

      observerSpy.unsubscribe();
    });
  });

  describe('setId()', () => {
    it('should call select on store with selectTodoList(id)', () => {
      const spectator = createService();
      const store = spectator.inject(Store);

      const id = '1';

      spectator.service.setId(id);

      expect(store.select).toHaveBeenCalledTimes(1);
    });

    it('should return initial state if todo list is undefined', () => {
      const spectator = createService();

      const observerSpy = subscribeSpyTo(spectator.service.state$);

      spectator.service.setId('1');

      todoList$.next(undefined);

      expect(observerSpy.getValues()).toEqual([initialState(), initialState()]);

      observerSpy.unsubscribe();
    });

    it('should patch the state with a todo list', () => {
      const spectator = createService();

      const observerSpy = subscribeSpyTo(spectator.service.todoList$);

      const id = '1';
      const expected: TodoList = {
        id,
        title: 'Test Title',
        items: [],
      };

      spectator.service.setId(id);
      todoList$.next(expected);

      expect(observerSpy.getValues()).toEqual([
        initialState().todoList,
        expected,
      ]);

      observerSpy.unsubscribe();
    });
  });

  describe('addTodo()', () => {
    it('should update the todo list in the store', () => {
      const spectator = createService();
      const todo1: TodoListItem = {
        description: 'Test 1',
        done: false,
      };
      const todo2: TodoListItem = {
        description: 'Test 2',
        done: true,
      };

      const observerSpy = subscribeSpyTo(spectator.service.items$);

      spectator.service.addToDo(todo1);
      spectator.service.addToDo(todo2);

      expect(observerSpy.getValues()).toEqual([[], [todo1], [todo1, todo2]]);

      observerSpy.unsubscribe();
    });

    it('should dispatch our items to the store', () => {
      const spectator = createService();
      const store = spectator.inject(Store);
      const todo1: TodoListItem = {
        description: 'Test 1',
        done: false,
      };
      const todo2: TodoListItem = {
        description: 'Test 2',
        done: true,
      };
      const todoList = initialState().todoList;

      spectator.service.addToDo(todo1);

      expect(store.dispatch).toHaveBeenCalledWith(
        TodoActions.todoListChanged({
          todoListId: todoList.id,
          changedList: create(todoList, (draft) => {
            draft.items = [todo1];
          }),
        })
      );

      spectator.service.addToDo(todo2);

      expect(store.dispatch).toHaveBeenCalledWith(
        TodoActions.todoListChanged({
          todoListId: todoList.id,
          changedList: create(todoList, (draft) => {
            draft.items = [todo1, todo2];
          }),
        })
      );

      spectator.service.addToDo(todo2);
    });
  });
});
