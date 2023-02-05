import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { PushModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectListIds } from '../../+store/todos.selectors';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'learn-angular-todo-list-host',
  standalone: true,
  imports: [CommonModule, PushModule, TodoListComponent, TodoComponent],
  template: ` <learn-angular-todo *ngFor="let listId of listIds$ | ngrxPush" [todoListId]="listId" /> `,
  styleUrls: ['./todo-list-host.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TodoListHostComponent {
  readonly #store = inject(Store);

  protected readonly listIds$ = this.#store.select(selectListIds);
}
