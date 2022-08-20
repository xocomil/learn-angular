import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { addTodo, clearAll, deleteTodo, updateChecked } from './+store/todos.actions';
import { selectTodoList } from './+store/todos.selectors';
import { TodoListItem } from './models/todo-list-item';

@Component({
  standalone: true,
  selector: 'learn-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule],
})
export class AppComponent {
  title = 'learn-angular';
  newTodoDescription = '';

  todosList$ = this.store.select(selectTodoList);

  constructor(private readonly store: Store) {}

  addNewTodo(): void {
    this.store.dispatch(addTodo({ todoListItem: getTodoListItem({ description: this.newTodoDescription }) }));
    this.newTodoDescription = '';
  }

  clearAll(): void {
    this.store.dispatch(clearAll());
  }

  checkedStateChanged(checkboxChange: MatCheckboxChange, arrayIndex: number): void {
    this.store.dispatch(updateChecked({ arrayIndex, checked: checkboxChange.checked }));
  }

  deleteItem(arrayIndex: number): void {
    this.store.dispatch(deleteTodo({ arrayIndex }));
  }
}

const getTodoListItem = ({ description = 'No description', done = false }: Partial<TodoListItem>): TodoListItem => ({ description, done });
