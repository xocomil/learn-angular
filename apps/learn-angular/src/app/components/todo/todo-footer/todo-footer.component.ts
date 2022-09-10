import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoListItem } from '../../../models/todo-list-item';

@Component({
  selector: 'learn-angular-todo-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form (submit)="addNewTodo()">
      <div class="new-todo-footer">
        <mat-form-field class="todo-description" appearance="fill">
          <mat-label>Something you need to do</mat-label>
          <input [(ngModel)]="newTodoDescription" autocomplete="off" name="newTodoDescription" matInput placeholder="Something to do" />
        </mat-form-field>
        <button class="add-btn" [disabled]="!newTodoDescription" type="submit" mat-raised-button matSuffix color="primary">Add</button>
      </div>
    </form>

    <button class="clear-all-btn" (click)="clearAll()" mat-raised-button type="button">Clear All</button>
  `,
  styleUrls: ['./todo-footer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent {
  protected newTodoDescription = '';

  @Output() newTodoAdded = new EventEmitter<TodoListItem>();
  @Output() clearAllPushed = new EventEmitter<void>();

  addNewTodo(): void {
    this.newTodoAdded.emit(getTodoListItem({ description: this.newTodoDescription }));
    this.newTodoDescription = '';
  }

  clearAll(): void {
    this.newTodoAdded.emit();
  }
}

const getTodoListItem = ({ description = 'No description', done = false }: Partial<TodoListItem>): TodoListItem => ({ description, done });
