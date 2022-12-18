import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'learn-angular-todo-list-host',
  standalone: true,
  imports: [CommonModule, TodoListComponent, TodoComponent],
  template: `
    <learn-angular-todo></learn-angular-todo>
    <learn-angular-todo></learn-angular-todo>
  `,
  styleUrls: ['./todo-list-host.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TodoListHostComponent {}
