import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectTodoList } from '../../+store/todos.selectors';
import { TodoListItem } from '../../models/todo-list-item';

export type CheckedEvent = { checked: boolean; arrayIndex: number };

type TodoListState = {
  title: string;
  id: number;
  items: TodoListItem[];
};

const initialState = (): TodoListState => ({
  title: 'Stuff To Do',
  id: -1,
  items: [],
});

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  #store = inject(Store);

  readonly id$ = this.select((state) => state.id);
  readonly title$ = this.select((state) => state.title);
  readonly items$ = this.select((state) => state.items);
  readonly todoList$ = this.select((state) => state);

  constructor() {
    super(initialState());
  }

  readonly setId = this.effect((id$: Observable<number>) =>
    id$.pipe(
      switchMap((todoListId) => this.#store.select(selectTodoList(todoListId))),
      tap((todoList) => {
        if (todoList) {
          this.patchState(todoList);

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
        this.patchState({ items: [...listItems, item] });
      })
    )
  );

  readonly clearAll = this.effect((clearAll$) =>
    clearAll$.pipe(
      tap(() => {
        this.patchState({ items: [] });
      })
    )
  );

  readonly itemChecked = this.effect((checkEvent$: Observable<CheckedEvent>) =>
    checkEvent$.pipe(
      withLatestFrom(this.items$),
      tap(([{ checked, arrayIndex }, listItems]) => {
        this.patchState({ items: listItems.map((item, index) => (arrayIndex === index ? { ...item, done: checked } : item)) });
      })
    )
  );

  readonly itemDeleted = this.effect((deletedIndex$: Observable<number>) =>
    deletedIndex$.pipe(
      withLatestFrom(this.items$),
      tap(([arrayIndex, listItems]) => {
        this.patchState({ items: listItems.filter((item, index) => index !== arrayIndex) });
      })
    )
  );
}
