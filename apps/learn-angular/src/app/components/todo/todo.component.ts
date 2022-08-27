import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import * as todoActions from '../../+store/todos.actions';
import { selectTodoList } from '../../+store/todos.selectors';
import { TodoListItem } from '../../models/todo-list-item';

@Component({
  selector: 'learn-angular-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  newTodoDescription = '';

  todosList$ = this.store.select(selectTodoList);

  constructor(private readonly store: Store) {}

  addNewTodo(): void {
    this.store.dispatch(todoActions.addTodo({ todoListItem: getTodoListItem({ description: this.newTodoDescription }) }));
    this.newTodoDescription = '';
  }

  clearAll(): void {
    this.store.dispatch(todoActions.clearAll());
  }

  checkedStateChanged(checkboxChange: MatCheckboxChange, arrayIndex: number): void {
    this.store.dispatch(todoActions.updateChecked({ arrayIndex, checked: checkboxChange.checked }));
  }

  deleteItem(arrayIndex: number): void {
    this.store.dispatch(todoActions.deleteTodo({ arrayIndex }));
  }
}

const getTodoListItem = ({ description = 'No description', done = false }: Partial<TodoListItem>): TodoListItem => ({ description, done });
