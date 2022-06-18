import { Component } from '@angular/core';
import { combineLatest, reduce, Subject } from 'rxjs';
import { TodoListItem } from './models/todo-list-item';

@Component({
  selector: 'learn-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-angular';
  newTodoDescription = '';

  #newTodoListItem$ = new Subject<TodoListItem>();
  #clearTodoList$ = new Subject<boolean>();

  todosList$ = combineLatest({
    newTodoListItem: this.#newTodoListItem$,
    clearTodoList: this.#clearTodoList$,
  }).pipe(reduce({ newTodoListItem }));

  constructor() {
.forEach((item) => {
      this.#newTodoListItem$.next(item);
    });
  }

  addNewTodo(): void {
    this.#newTodoListItem$.next({ done: false, description: this.newTodoDescription });

    this.newTodoDescription = '';
  }

  clearAll(): void {
    this.#clearTodoList$.next(true);
  }
}
