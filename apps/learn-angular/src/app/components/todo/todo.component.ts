import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { PushModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import * as todoActions from '../../+store/todos.actions';
import { selectTodoList } from '../../+store/todos.selectors';
import { TodoListItem } from '../../models/todo-list-item';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'learn-angular-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TodoListComponent,
    PushModule,
    TodoFooterComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  protected readonly todosList$ = this.store.select(selectTodoList);

  constructor(private readonly store: Store) {}

  addNewTodo(todoListItem: TodoListItem): void {
    this.store.dispatch(todoActions.addTodo({ todoListItem }));
  }

  clearAll(): void {
    this.store.dispatch(todoActions.clearAll());
  }

  checkedStateChanged(checkedEvent: { checked: boolean; arrayIndex: number }): void {
    this.store.dispatch(todoActions.updateChecked(checkedEvent));
  }

  deleteItem(deleteEvent: { arrayIndex: number }): void {
    this.store.dispatch(todoActions.deleteTodo(deleteEvent));
  }
}
