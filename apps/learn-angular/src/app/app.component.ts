import { Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  standalone: true,
  selector: 'learn-angular-root',
  template: `
    <div class="main-display">
      <learn-angular-todo></learn-angular-todo>
      <learn-angular-todo></learn-angular-todo>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [TodoComponent],
})
export class AppComponent {
  title = 'learn-angular';
}
