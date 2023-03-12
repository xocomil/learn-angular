import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TodoActions } from '../../+store/todos.actions';

@Component({
  selector: 'learn-angular-add-todo-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <button (click)="addList()" mat-fab color="primary">
      <mat-icon fontIcon="add" />
    </button>
  `,
  styleUrls: ['./add-todo-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoButtonComponent {
  readonly #store = inject(Store);

  protected addList() {
    this.#store.dispatch(TodoActions.todoListAdded());
  }
}
