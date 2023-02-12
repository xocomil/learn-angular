import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { PushModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectListIds, selectNoTodoLists } from '../../+store/todos.selectors';
import { NoTodoListComponent } from '../no-todo-list/no-todo-list.component';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'learn-angular-todo-list-host',
  standalone: true,
  template: `
    <learn-angular-no-todo-list *ngIf="noTodoLists$ | ngrxPush" />
    <learn-angular-todo
      *ngFor="let listId of listIds$ | ngrxPush"
      [todoListId]="listId"
    />
  `,
  styleUrls: ['./todo-list-host.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PushModule,
    NoTodoListComponent,
    TodoComponent,
    TodoListComponent,
  ],
})
export default class TodoListHostComponent {
  readonly #store = inject(Store);

  protected readonly listIds$ = this.#store.select(selectListIds);
  protected readonly noTodoLists$ = this.#store.select(selectNoTodoLists);
}
