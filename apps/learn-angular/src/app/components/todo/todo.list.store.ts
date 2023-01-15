import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { create } from 'mutative';
import { Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { TodoActions } from '../../+store/todos.actions';
import { selectTodoList } from '../../+store/todos.selectors';
import { TodoListItem } from '../../models/todo-list-item';
import { TodoList } from '../../models/todo-list.model';

export type CheckedEvent = { checked: boolean; arrayIndex: number };

type TodoListState = {
  editTitle: boolean;
  todoList: TodoList;
};

const initialState = (): TodoListState => ({
  editTitle: false,
  todoList: {
    title: 'Stuff To Do',
    id: -1,
    items: [],
  },
});

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  #store = inject(Store);

  readonly id$ = this.select((state) => state.todoList.id);
  readonly title$ = this.select((state) => state.todoList.title);
  readonly items$ = this.select((state) => state.todoList.items);
  readonly todoList$ = this.select((state) => state.todoList);

  constructor() {
    super(initialState());
  }

  readonly setId = this.effect((id$: Observable<number>) =>
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
        this.#updateTodoItems(listItems.map((item, index) => (arrayIndex === index ? { ...item, done: checked } : item)));

        this.#listChanged();
      })
    )
  );

  readonly itemDeleted = this.effect((deletedIndex$: Observable<number>) =>
    deletedIndex$.pipe(
      withLatestFrom(this.items$),
      tap(([arrayIndex, listItems]) => {
        this.#updateTodoItems(listItems.filter((item, index) => index !== arrayIndex));

        this.#listChanged();
      })
    )
  );

  readonly #listChanged = this.effect((listChanged$: Observable<void>) =>
    listChanged$.pipe(
      withLatestFrom(this.todoList$),
      tap(([, todoList]) => {
        this.#store.dispatch(TodoActions.todoListChanged({ todoListId: todoList.id, changedList: todoList }));
      })
    )
  );
}
