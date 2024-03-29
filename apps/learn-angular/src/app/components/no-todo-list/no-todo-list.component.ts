import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TodoActions } from '../../+store/todos.actions';

@Component({
  selector: 'learn-angular-no-todo-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>You don't have any Todo Lists</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          It appears that you don't have any Todo Lists. This could be because
          it is your first or because you deleted them all.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button (click)="addTodo()" data-cy="add-button" mat-button>
          <mat-icon fontIcon="add"></mat-icon>
          Add a new Todo List.
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./no-todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTodoListComponent {
  readonly #store = inject(Store);

  protected addTodo() {
    this.#store.dispatch(TodoActions.todoListAdded());
  }
}
