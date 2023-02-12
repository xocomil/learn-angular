import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { create } from 'mutative';
import { map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { TodoActions } from '../../+store/todos.actions';
import { selectTodoList } from '../../+store/todos.selectors';
import { TodoListItem } from '../../models/todo-list-item';
import { TodoList } from '../../models/todo-list.model';

export type CheckedEvent = { checked: boolean; arrayIndex: number };

export type IsLoadingStatus = {
  status: 'loading';
};

export type IdleStatus = {
  status: 'idle';
};

export type SuccessStatus = {
  status: 'success';
};

export type ErrorStatus = {
  status: 'error';
  message: string;
};

export type LoadingStatus =
  | IdleStatus
  | IsLoadingStatus
  | SuccessStatus
  | ErrorStatus;

const createLoadingStatus = (
  status: 'idle' | 'loading' | 'success'
): LoadingStatus => ({ status });

const createErrorStatus = (message: string): LoadingStatus => ({
  status: 'error',
  message,
});

type TodoListState = {
  editTitle: boolean;
  todoList: TodoList;
  loadingStatus: LoadingStatus;
};

const initialState = (): TodoListState => ({
  editTitle: false,
  todoList: {
    title: 'Stuff To Do',
    id: '-1',
    items: [],
  },
  loadingStatus: createLoadingStatus('idle'),
});

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  #store = inject(Store);

  readonly id$ = this.select((state) => state.todoList.id);
  readonly title$ = this.select((state) => state.todoList.title);
  readonly items$ = this.select((state) => state.todoList.items);
  readonly todoList$ = this.select((state) => state.todoList);
  readonly editTitle$ = this.select((state) => state.editTitle);
  readonly editTitleIcon$ = this.editTitle$.pipe(
    map((editTitle) => (editTitle ? 'save' : 'edit'))
  );
  readonly showSpinner$ = this.select(
    (state) => state.loadingStatus.status === 'loading'
  );

  constructor() {
    super(initialState());
  }

  readonly setId = this.effect((id$: Observable<string>) =>
    id$.pipe(
      switchMap((todoListId) => this.#store.select(selectTodoList(todoListId))),
      tap((todoList) => {
        if (todoList) {
          this.patchState({ todoList });

          return;
        }

        this.patchState(initialState());
      })
    )
  );

  readonly addToDo = this.effect((todoItem$: Observable<TodoListItem>) =>
    todoItem$.pipe(
      withLatestFrom(this.items$),
      tap(([item, listItems]) => {
        this.#updateTodoItems([...listItems, item]);

        this.#listChanged();
      })
    )
  );

  readonly deleteList = this.effect((deleteList$: Observable<void>) =>
    deleteList$.pipe(
      withLatestFrom(this.id$),
      tap(([, id]) => {
        console.log('deleteList', id);
        this.#store.dispatch(TodoActions.todoListDeleted({ id }));
      })
    )
  );

  readonly #updateTodoItems = this.updater((state, items: TodoListItem[]) =>
    create(state, (draft) => {
      draft.todoList.items = items;
    })
  );

  readonly clearAll = this.effect((clearAll$) =>
    clearAll$.pipe(
      tap(() => {
        this.#updateTodoItems([]);

        this.#listChanged();
      })
    )
  );

  readonly itemChecked = this.effect((checkEvent$: Observable<CheckedEvent>) =>
    checkEvent$.pipe(
      withLatestFrom(this.items$),
      tap(([{ checked, arrayIndex }, listItems]) => {
        this.#updateTodoItems(
          listItems.map((item, index) =>
            arrayIndex === index ? { ...item, done: checked } : item
          )
        );

        this.#listChanged();
      })
    )
  );

  readonly itemDeleted = this.effect((deletedIndex$: Observable<number>) =>
    deletedIndex$.pipe(
      withLatestFrom(this.items$),
      tap(([arrayIndex, listItems]) => {
        this.#updateTodoItems(
          listItems.filter((item, index) => index !== arrayIndex)
        );

        this.#listChanged();
      })
    )
  );

  readonly #listChanged = this.effect((listChanged$: Observable<void>) =>
    listChanged$.pipe(
      withLatestFrom(this.todoList$),
      tap(([, todoList]) => {
        this.#store.dispatch(
          TodoActions.todoListChanged({
            todoListId: todoList.id,
            changedList: todoList,
          })
        );
      })
    )
  );

  toggleEditTitle = this.updater((state) => {
    return create(state, (draft) => {
      draft.editTitle = !state.editTitle;
    });
  });

  readonly setTitle = this.effect((newTitle$: Observable<string>) =>
    newTitle$.pipe(
      tap((newTitle) => {
        this.#updateTitle({ newTitle });
        this.#listChanged();
      })
    )
  );

  readonly #updateTitle = this.updater(
    (state, { newTitle }: { newTitle: string }) => {
      return create(state, (draft) => {
        draft.todoList.title = newTitle;
      });
    }
  );
}
