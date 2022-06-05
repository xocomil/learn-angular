import { Component } from '@angular/core';
import { TodoListItem } from './models/todo-list-item';

@Component({
  selector: 'learn-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-angular';
  newTodoDescription = '';

  todosList: TodoListItem[] = [
    {
      done: false,
      description: 'learn angular',
    },
    { done: false, description: 'attend the Angular Community Meetup' },
    { done: true, description: 'style with Angular Material' },
  ];

  addNewTodo(): void {
    this.todosList = [...this.todosList, { done: false, description: this.newTodoDescription }];

    this.newTodoDescription = '';
  }
}
